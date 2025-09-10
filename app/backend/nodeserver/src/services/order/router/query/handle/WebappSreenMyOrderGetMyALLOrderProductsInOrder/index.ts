import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderProductField } from '@src/dataStruct/order';
import QueryDB_WebappSreenMyOrderGetMyALLOrderProductsInOrder from '../../queryDB/WebappSreenMyOrderGetMyALLOrderProductsInOrder';
import { verifyRefreshToken } from '@src/token';





class Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, unknown, {orderId: string}>, res: Response) => {
        const orderId = parseInt(req.query.orderId) || -1;

        const myResponse: MyResponse<OrderProductField> = {
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

        await this._mssql_server.init()

        const queryDB_webappSreenMyOrderGetMyALLOrderProductsInOrder = new QueryDB_WebappSreenMyOrderGetMyALLOrderProductsInOrder();
        queryDB_webappSreenMyOrderGetMyALLOrderProductsInOrder.setOrderId(orderId);
        queryDB_webappSreenMyOrderGetMyALLOrderProductsInOrder.setUserId(userId);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            queryDB_webappSreenMyOrderGetMyALLOrderProductsInOrder.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await queryDB_webappSreenMyOrderGetMyALLOrderProductsInOrder.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.data = result?.recordset[0]
                myResponse.message = 'Lấy sản phẩm được đặt thành công !';
                myResponse.isSuccess = true;
                return res.status(200).json(myResponse);
            } else {
                myResponse.message = 'Lấy sản phẩm được đặt KHÔNG thành công 1 !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Lấy sản phẩm được đặt KHÔNG thành công 2 !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder;
