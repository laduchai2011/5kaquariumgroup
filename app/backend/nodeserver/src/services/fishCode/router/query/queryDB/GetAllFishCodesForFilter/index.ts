import sql from 'mssql';
import { QueryDB } from '@src/services/fishCode/interface';
import { FishCodeForFilterField } from '@src/dataStruct/fishCode';

class QueryDB_Get_AllFishCodesForFilter extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }


    async run(): Promise<sql.IProcedureResult<FishCodeForFilterField> | void> {
        if (this._connectionPool !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .execute('GetAllFishCodesAccordingtoNameForFilter')
                    
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_Get_AllFishCodesForFilter;
