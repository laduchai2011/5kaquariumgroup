import sql from 'mssql';
import { QueryDB } from '@src/services/account/interface';
// import { login_infor_type } from '../../handle/contacts/type';
import { StatisticField } from '@src/dataStruct/account';

class QueryDB_Get_Statistic extends QueryDB {
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

    async run(): Promise<sql.IResult<StatisticField> | void> {
        if (this._connectionPool !== undefined && this._userId !==undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("userId", sql.Int, this._userId)
                    .query("SELECT * FROM dbo.GetStatistic(@userId)")
                    
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_Get_Statistic;
