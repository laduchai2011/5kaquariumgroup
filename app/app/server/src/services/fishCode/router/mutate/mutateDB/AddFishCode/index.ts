import sql from 'mssql';
import { MutateDB } from '@src/services/fishCode/interface';
import { FishCodeField } from '@src/dataStruct/fishCode';

class MutateDB_AddFishCode extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _newFishCode: FishCodeField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_newFishCode(newFishCode: FishCodeField): void {
        this._newFishCode = newFishCode;
    }

    async run(): Promise<sql.IProcedureResult<FishCodeField> | undefined> {
        if (this._connectionPool !== undefined && this._newFishCode !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("name", sql.NVarChar(255), this._newFishCode.name)
                    .input("size", sql.NVarChar(255), this._newFishCode.size)
                    .input("amount", sql.NVarChar(255), this._newFishCode.amount)
                    .input("price", sql.NVarChar(255), this._newFishCode.price)
                    .input("detail", sql.NVarChar(sql.MAX), this._newFishCode.detail)
                    .input("userId", sql.Numeric, this._newFishCode.userId)
                    .execute<FishCodeField>('AddFishCode');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_AddFishCode;
