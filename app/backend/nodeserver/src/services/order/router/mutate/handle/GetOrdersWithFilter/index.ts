import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { PagedOrderField, OrderFilterField, OrderField } from '@src/dataStruct/order';
import MutateDB_GetOrdersWithFilter from '../../mutateDB/GetOrdersWithFilter';





class Handle_GetOrdersWithFilter {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<Record<string, never>, unknown, OrderFilterField>, res: Response) => {
        const orderFilterField = req.body;

        const myResponse: MyResponse<PagedOrderField> = {
            isSuccess: false
        };

        const mutateDB_getOrdersWithFilter = new MutateDB_GetOrdersWithFilter();
        mutateDB_getOrdersWithFilter.setOrderFilter(orderFilterField)

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_getOrdersWithFilter.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_getOrdersWithFilter.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const rows: OrderField[] = result.recordset;
                myResponse.data = {items: rows, totalCount: result.recordsets[1][0].totalCount};
                myResponse.message = 'Lấy đơn hàng thành công !';
                myResponse.isSuccess = true;
                return res.json(myResponse);
            } else {
                myResponse.message = 'Lấy đơn hàng KHÔNG thành công 1 !';
                return res.status(500).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Lấy đơn hàng KHÔNG thành công 2 !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_GetOrdersWithFilter;
