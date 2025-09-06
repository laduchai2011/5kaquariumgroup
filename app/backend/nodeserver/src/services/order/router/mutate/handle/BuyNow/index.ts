import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderField, BuyNowBodyType } from '@src/dataStruct/order';
import { verifyRefreshToken } from '@src/token';
import MutateDB_BuyNow from '../../mutateDB/BuyNow';
// import { produceTask } from '@src/queueRedis/producer';




class Handle_BuyNow {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request<Record<string, never>, unknown, BuyNowBodyType>, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<OrderField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const buyNowBody = req.body;
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
            const newOrder_cp = {...buyNowBody.order}
            newOrder_cp.userId = id;
            buyNowBody.order = newOrder_cp
            res.locals.buyNowBody = buyNowBody;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            return res.status(500).json(myResponse);
        }
    };

    main = async (_: Request, res: Response) => {
        const buyNowBody = res.locals.buyNowBody as BuyNowBodyType;

        const myResponse: MyResponse<OrderField> = {
            isSuccess: false
        };

        const mutateDB_buyNow = new MutateDB_BuyNow();
        mutateDB_buyNow.set_buyNowBody(buyNowBody)

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_buyNow.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_buyNow.run();
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

export default Handle_BuyNow;
