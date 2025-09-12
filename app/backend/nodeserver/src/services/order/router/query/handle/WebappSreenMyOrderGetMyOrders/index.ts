import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { PagedOrderField, OrderField, GetMyOrderBodyType } from '@src/dataStruct/order';
import QueryDB_WebappSreenMyOrderGetMyOrders from '../../queryDB/WebappSreenMyOrderGetMyOrders';
import { verifyRefreshToken } from '@src/token';





class Handle_WebappSreenMyOrderGetMyOrders {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<Record<string, never>, unknown, GetMyOrderBodyType>, res: Response) => {
        const myOrder = req.body;

        const myResponse: MyResponse<PagedOrderField> = {
            isSuccess: false
        };

        let userId = -1;

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

        myOrder.order.userId = userId;

        await this._mssql_server.init()

        const queryDB_webappSreenMyOrderGetMyOrders = new QueryDB_WebappSreenMyOrderGetMyOrders();
        queryDB_webappSreenMyOrderGetMyOrders.setMyOrder(myOrder)

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_webappSreenMyOrderGetMyOrders.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await queryDB_webappSreenMyOrderGetMyOrders.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const rows: OrderField[] = result.recordset;
                myResponse.data = {items: rows, totalCount: result.recordsets[1][0].totalCount};
                myResponse.message = 'Lấy đơn hàng thành công !';
                myResponse.isSuccess = true;
                return res.status(200).json(myResponse);
            } else {
                myResponse.message = 'Lấy đơn hàng KHÔNG thành công 1 !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Lấy đơn hàng KHÔNG thành công 2 !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_WebappSreenMyOrderGetMyOrders;
