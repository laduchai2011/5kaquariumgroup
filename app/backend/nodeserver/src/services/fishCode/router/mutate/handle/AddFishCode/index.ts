import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import MutateDB_AddFishCode from '../../mutateDB/AddFishCode';
import { FishCodeField } from '@src/dataStruct/fishCode';
import { MyResponse } from '@src/dataStruct/response';
import { verifyRefreshToken } from '@src/token';

class Handle_AddFishCode {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request<Record<string, never>, unknown, FishCodeField>, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<FishCodeField> = {
            isSuccess: false
        };
        
        await this._mssql_server.init()

        const newFishCode = req.body;
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
            newFishCode.userId = id;
            res.locals.newFishCode = newFishCode;

            return next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            return res.status(500).json(myResponse);
        }
    };

    main = async (_: Request<Record<string, never>, unknown, FishCodeField>, res: Response) => {
        const newFishCode = res.locals.newFishCode as FishCodeField;

        const myResponse: MyResponse<FishCodeField> = {
            isSuccess: false
        };

        const mutateDB_addFishCode= new MutateDB_AddFishCode();
        mutateDB_addFishCode.set_newFishCode(newFishCode);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_addFishCode.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_addFishCode.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.message = 'Thêm mã cá thành công !';
                myResponse.isSuccess = true;
                myResponse.data = result?.recordset[0];
                return res.json(myResponse);
            } else {
                myResponse.message = 'Thêm mã cá KHÔNG thành công 1!';
                return res.status(500).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Thêm mã cá KHÔNG thành công 2 !';
            myResponse.err = error;
            console.log('Handle_AddFishCode', error)
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_AddFishCode;
