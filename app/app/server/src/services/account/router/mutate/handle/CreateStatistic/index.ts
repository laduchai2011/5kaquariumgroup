import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import MutateDB_CreateStatistic from '../../mutateDB/CreateStatistic';
import { StatisticField } from '@src/dataStruct/account';
import { MyResponse } from '@src/dataStruct/response';
import { verifyRefreshToken } from '@src/token';

class Handle_CreateStatistic {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<StatisticField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

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
            res.locals.userId = id;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            return res.status(500).json(myResponse);
        }
    };

    main = async (_: Request, res: Response) => {
        const userId = res.locals.userId as number;

        const myResponse: MyResponse<StatisticField> = {
            isSuccess: false
        };

        const mutateDB_createStatistic = new MutateDB_CreateStatistic();
        mutateDB_createStatistic.set_userId(userId);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_createStatistic.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_createStatistic.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.message = 'Tạo thống kê thành công !';
                myResponse.isSuccess = true;
                myResponse.data = result?.recordset[0];
                return res.json(myResponse);
            } else {
                myResponse.message = 'Tạo thống kê KHÔNG thành công !';
                return res.status(500).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Tạo thống kê KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_CreateStatistic;
