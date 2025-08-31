import sql from 'mssql';
import { QueryDB } from '@src/services/fishCode/interface';
import { FishCodeField } from '@src/dataStruct/fishCode';

class QueryDB_Get_AFishCodeWithId extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _id: number | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setId(id: number): void {
        this._id = id;
    }

    async run(): Promise<sql.IResult<FishCodeField> | void> {
        if (this._connectionPool !== undefined && this._id !==undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("id", sql.Int, this._id)
                    .query("SELECT * FROM dbo.GetFishCodeWithId(@id)")
                    
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_Get_AFishCodeWithId;
