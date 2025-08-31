import sql from 'mssql';
import { MutateDB } from '@src/services/account/interface';
import { AccountField } from '@src/dataStruct/account';

class MutateDB_ChangeName extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _account: AccountField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_account(account: AccountField): void {
        this._account = account;
    }

    async run(): Promise<sql.IProcedureResult<AccountField> | undefined> {
        if (this._connectionPool !== undefined && this._account !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("userId", sql.Int, this._account.id)
                    .input("firstName", sql.NVarChar(100), this._account.firstName)
                    .input("lastName", sql.NVarChar(100), this._account.lastName)
                    .execute<AccountField>('ChangeName');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_ChangeName;
