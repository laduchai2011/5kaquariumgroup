import sql from 'mssql';
import { MutateDB } from '@src/services/product/interface';
import { ProductField } from '@src/dataStruct/product';

class MutateDB_OrderUpdateChangeProductAmount extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _id: number | undefined;
    private _newAmount: string | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_id(id: number): void {
        this._id = id;
    }

    set_newAmount(newAmount: string): void {
        this._newAmount = newAmount;
    }

    async run(): Promise<sql.IProcedureResult<ProductField> | undefined> {
        if (this._connectionPool !== undefined && this._id !== undefined && this._newAmount !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("id", sql.Int, this._id)
                    .input("amount", sql.NVarChar(255), this._newAmount)
                    .execute<ProductField>('ChangeProductAmount');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_OrderUpdateChangeProductAmount;
