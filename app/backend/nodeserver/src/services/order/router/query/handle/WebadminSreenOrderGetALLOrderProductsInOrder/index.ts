import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderProductField } from '@src/dataStruct/order';
import QueryDB_WebadminSreenOrderGetALLOrderProductsInOrder from '../../queryDB/WebadminSreenOrderGetALLOrderProductsInOrder';






class Handle_WebadminSreenOrderGetALLOrderProductsInOrder {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, unknown, {orderId: string}>, res: Response) => {
        const orderId = parseInt(req.query.orderId) || -1;

        const myResponse: MyResponse<OrderProductField[]> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const queryDB_webadminSreenOrderGetALLOrderProductsInOrder = new QueryDB_WebadminSreenOrderGetALLOrderProductsInOrder();
        queryDB_webadminSreenOrderGetALLOrderProductsInOrder.setOrderId(orderId);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_webadminSreenOrderGetALLOrderProductsInOrder.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await queryDB_webadminSreenOrderGetALLOrderProductsInOrder.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.data = result?.recordset
                myResponse.message = 'Lấy sản phẩm thành công !';
                myResponse.isSuccess = true;
                return res.status(200).json(myResponse);
            } else {
                myResponse.message = 'Lấy sản phẩm KHÔNG thành công 1 !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Lấy sản phẩm KHÔNG thành công 2 !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_WebadminSreenOrderGetALLOrderProductsInOrder;
