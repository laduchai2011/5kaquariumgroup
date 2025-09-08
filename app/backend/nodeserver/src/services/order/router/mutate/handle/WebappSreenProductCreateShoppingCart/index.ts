import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderField } from '@src/dataStruct/order';
import { verifyRefreshToken } from '@src/token';
import MutateDB_WebappSreenProductCreateShoppingCart from '../../mutateDB/WebappSreenProductCreateShoppingCart';
// import { produceTask } from '@src/queueRedis/producer';




class Handle_WebappSreenProductCreateShoppingCart {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request<Record<string, never>, unknown, OrderField>, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<OrderField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const order = req.body;
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

            const { id } = verify_refreshToken;
            order.userId = id;
            res.locals.order = order;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            return res.status(500).json(myResponse);
        }
    };

    main = async (_: Request, res: Response) => {
        const order = res.locals.order as OrderField;

        const myResponse: MyResponse<OrderField> = {
            isSuccess: false
        };

        const mutateDB_webappSreenProductCreateShoppingCart = new MutateDB_WebappSreenProductCreateShoppingCart();
        mutateDB_webappSreenProductCreateShoppingCart.set_order(order);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_webappSreenProductCreateShoppingCart.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_webappSreenProductCreateShoppingCart.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0]
                // produceTask<OrderField>('addOrder-to-provider', data);
                myResponse.message = 'Tạo giỏ hàng thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                return res.json(myResponse);
            } else {
                myResponse.message = 'Tạo giỏ hàng KHÔNG thành công !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Tạo giỏ hàng KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_WebappSreenProductCreateShoppingCart;
