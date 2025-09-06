import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderField, AddToNewCartBodyType } from '@src/dataStruct/order';
import { verifyRefreshToken } from '@src/token';
import MutateDB_AddToNewCart from '../../mutateDB/AddToNewCart';
// import { produceTask } from '@src/queueRedis/producer';




class Handle_AddToNewCart {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request<Record<string, never>, unknown, AddToNewCartBodyType>, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<OrderField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const addToNewCartBody = req.body;
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
            const newOrder_cp = {...addToNewCartBody.order}
            newOrder_cp.userId = id;
            addToNewCartBody.order = newOrder_cp
            res.locals.newAddOrderBody = addToNewCartBody;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            return res.status(500).json(myResponse);
        }
    };

    main = async (_: Request, res: Response) => {
        const addToNewCartBody = res.locals.addToNewCartBody as AddToNewCartBodyType;

        const myResponse: MyResponse<OrderField> = {
            isSuccess: false
        };

        const mutateDB_addToNewCart = new MutateDB_AddToNewCart();
        mutateDB_addToNewCart.set_addToNewCartBody(addToNewCartBody);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_addToNewCart.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_addToNewCart.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0]
                // produceTask<OrderField>('addOrder-to-provider', data);
                myResponse.message = 'Đặt hàng thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                return res.json(myResponse);
            } else {
                myResponse.message = 'Đặt hàng KHÔNG thành công !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Đặt hàng KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_AddToNewCart;
