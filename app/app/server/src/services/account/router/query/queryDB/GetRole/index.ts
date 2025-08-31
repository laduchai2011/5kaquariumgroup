import sql from 'mssql';
import { QueryDB } from '@src/services/account/interface';
import { RoleField } from '@src/dataStruct/role';

class QueryDB_Get_Role extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _userId: number | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setUserId(userId: number): void {
        this._userId = userId
    }

    async run(): Promise<sql.IResult<RoleField> | void> {
        if (this._connectionPool !== undefined && this._userId !==undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("userId", sql.Int, this._userId)
                    .query("SELECT * FROM dbo.GetRoleWithFK(@userId)")
                    
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_Get_Role;
