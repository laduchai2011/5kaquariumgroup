import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_WebappSreenProductGetShoppingCarts from '../../queryDB/WebappSreenProductGetShoppingCarts';
import { MyResponse } from '@src/dataStruct/response';
import { OrderField, PagedOrderField } from '@src/dataStruct/order';
import { verifyRefreshToken } from '@src/token';


class Handle_WebappSreenProductGetShoppingCarts {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, unknown, {page: string, size: string}>, res: Response) => {
        const myResponse: MyResponse<PagedOrderField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        let userId = -1;
        const page = parseInt(req.query.page, 10) || 1;
        const size = parseInt(req.query.size, 10) || 10;

        const { refreshToken } = req.cookies;
             
        if (typeof refreshToken === 'string') {
            const verify_refreshToken = verifyRefreshToken(refreshToken);

            if (verify_refreshToken === "invalid") {
                myResponse.message = "Refresh-Token không hợp lệ, hãy đăng nhập lại !"
                return res.status(500).json(myResponse);
            }

            if (verify_refreshToken === "expired") {
                myResponse.message = "Refresh-Token hết hạn, hãy đăng nhập lại !"
                return res.status(500).json(myResponse);
            }

            if (verify_refreshToken && verify_refreshToken.id) {
               userId = verify_refreshToken.id;
            } else {
                myResponse.isSignin = false;
                return res.status(500).json(myResponse);
            }
        } else {
            myResponse.isSignin = false;
            return res.status(500).json(myResponse);
        }

        const queryDB_webappSreenProductGetShoppingCarts = new QueryDB_WebappSreenProductGetShoppingCarts();

        queryDB_webappSreenProductGetShoppingCarts.setUserId(userId);
        queryDB_webappSreenProductGetShoppingCarts.setSize(size);
        queryDB_webappSreenProductGetShoppingCarts.setPage(page);
        const conn = this._mssql_server.get_connectionPool();

        if (conn) {
            queryDB_webappSreenProductGetShoppingCarts.set_connection_pool(conn);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            return res.status(500).json(myResponse);
        }

        const result = await queryDB_webappSreenProductGetShoppingCarts.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const rows: OrderField[] = result.recordset;
            myResponse.data = {items: rows, totalCount: result.recordsets[1][0].totalCount};
            myResponse.message = 'Lấy dữ liệu thành công !';
            myResponse.isSuccess = true;
            return res.status(200).json(myResponse);
        } else {
            myResponse.message = 'Không có dữ liệu nào được tìm thấy !';
            myResponse.isSuccess = true;
            return res.status(204).json(myResponse);
        }
    };
}

export default Handle_WebappSreenProductGetShoppingCarts;
