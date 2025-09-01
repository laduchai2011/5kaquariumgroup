import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_Get_AccountWithId from '../../queryDB/GetAccountWithId';
import { MyResponse } from '@src/dataStruct/response';
import { AccountField } from '@src/dataStruct/account';
// import { verifyRefreshToken } from '@src/token';


class Handle_Get_AccountWithId {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, unknown, {id: string}>, res: Response) => {
        const myResponse: MyResponse<AccountField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const id = parseInt(req.query.id) || -1;

        const queryDB_get_accountWithId = new QueryDB_Get_AccountWithId();

        if (id !== -1) {
            queryDB_get_accountWithId.setUserId(id);
        } else {
            myResponse.message = 'Id người dùng không chính xác !';
            return res.status(500).json(myResponse);
        }

        const conn = this._mssql_server.get_connectionPool();
        if (conn) {
            queryDB_get_accountWithId.set_connection_pool(conn)
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            return res.status(500).json(myResponse);
        }

        const result = await queryDB_get_accountWithId.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const account = result.recordset[0]
            account.userName = '';
            account.password = '';
            account.phone = ''
            myResponse.data = account;
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

export default Handle_Get_AccountWithId;
