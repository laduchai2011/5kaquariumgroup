import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import MutateDB_ChangeName from '../../mutateDB/ChangeName';
import { AccountField } from '@src/dataStruct/account';
import { MyResponse } from '@src/dataStruct/response';
import { verifyRefreshToken } from '@src/token';

class Handle_ChangeName {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request<Record<string, never>, unknown, AccountField>, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<AccountField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const account = req.body;
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
            account.id = id;
            res.locals.account = account;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            return res.status(500).json(myResponse);
        }
    };

    main = async (_: Request<Record<string, never>, unknown, AccountField>, res: Response) => {
        const account = res.locals.account as AccountField;

        const myResponse: MyResponse<AccountField> = {
            isSuccess: false
        };

        const mutateDB_changeName = new MutateDB_ChangeName();
        mutateDB_changeName.set_account(account);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_changeName.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_changeName.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.message = 'Thay đổi tên thành công !';
                myResponse.isSuccess = true;
                myResponse.data = result?.recordset[0];
                return res.json(myResponse);
            } else {
                myResponse.message = 'Thay đổi tên KHÔNG thành công !';
                return res.status(500).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Thay đổi tên KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_ChangeName;
