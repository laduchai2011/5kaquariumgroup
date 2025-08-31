import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_Get_Products from '../../queryDB/GetProducts';
import { MyResponse } from '@src/dataStruct/response';
import { ProductField, PagedProductField } from '@src/dataStruct/product';



class Handle_Get_Products {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, unknown, {page: string, size: string, fishCodeId: string}>, res: Response) => {
        const myResponse: MyResponse<PagedProductField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const page = parseInt(req.query.page, 10) || 1;
        const size = parseInt(req.query.size, 10) || 10;
        const fishCodeId = parseInt(req.query.fishCodeId, 10) || -1;

        const queryDB_get_products = new QueryDB_Get_Products();

        queryDB_get_products.setSize(size);
        queryDB_get_products.setPage(page);
        queryDB_get_products.setProductFilter({fishCodeId: fishCodeId})
        const conn = this._mssql_server.get_connectionPool();

        if (conn) {
            queryDB_get_products.set_connection_pool(conn)
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            return res.status(500).json(myResponse);
        }

        const result = await queryDB_get_products.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const rows: ProductField[] = result.recordset;
            myResponse.data = {items: rows, totalCount: result.recordsets[1][0].totalCount};
            myResponse.message = 'Lấy dữ liệu thành công !';
            myResponse.isSuccess = true;
            return res.json(myResponse);
        } else {
            myResponse.message = 'Không có dữ liệu nào được tìm thấy !';
            myResponse.isSuccess = true;
            return res.json(myResponse);
        }
    };
}

export default Handle_Get_Products;
