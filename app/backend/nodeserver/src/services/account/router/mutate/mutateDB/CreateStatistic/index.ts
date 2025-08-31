import sql from 'mssql';
import { MutateDB } from '@src/services/account/interface';
// import { signin_infor_type } from '../../handle/signin/type';
import { StatisticField } from '@src/dataStruct/account';

class MutateDB_CreateStatistic extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _userId: number | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_userId(userId: number): void {
        this._userId = userId;
    }

    async run(): Promise<sql.IProcedureResult<StatisticField> | undefined> {
        if (this._connectionPool !== undefined && this._userId !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("userId", sql.Int, this._userId)
                    .execute<StatisticField>('CreateStatistic');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_CreateStatistic;
