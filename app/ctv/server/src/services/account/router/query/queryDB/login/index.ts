import sql from 'mssql';
import { QueryDB } from '@src/services/account/interface';
import { login_infor_type } from '../../handle/login/type';
import { AccountField } from '@src/dataStruct/account';

class QueryDB_Login extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _login_infor: login_infor_type | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_infor_input(login_infor: login_infor_type): void {
        this._login_infor = login_infor;
    }

    async run(): Promise<sql.IResult<AccountField> | undefined> {
        if (this._connectionPool !== undefined && this._login_infor !== undefined) {
            try {
                // console.log(222222222222222, this._login_infor.userName, this._login_infor.password)
                // const result = await this._connectionPool.query(
                //     `SELECT * FROM Signin('${this._login_infor.userName}', '${this._login_infor.password}')`
                // );
                const result = await this._connectionPool
                    .request()
                    .input("userName", sql.NVarChar(100), this._login_infor.userName)
                    .input("password", sql.NVarChar(100), this._login_infor.password)
                    .query(`SELECT * FROM dbo.Signin(@userName, @password)`);
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_Login;
