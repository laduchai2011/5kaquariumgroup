import sql from 'mssql';
import { QueryDB } from '@src/services/order/interface';
import { login_infor_type } from '../../handle/login/type';

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

    async run(): Promise<sql.IResult<unknown> | undefined> {
        if (this._connectionPool !== undefined && this._login_infor !== undefined) {
            try {
                const result = await this._connectionPool.query(
                    `SELECT * FROM Login('${this._login_infor.userName}', '${this._login_infor.password}')`
                );
                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default QueryDB_Login;
