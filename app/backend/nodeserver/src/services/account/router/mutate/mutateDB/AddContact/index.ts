import sql from 'mssql';
import { MutateDB } from '@src/services/account/interface';
// import { signin_infor_type } from '../../handle/signin/type';
import { ContactField } from '@src/dataStruct/account';

class MutateDB_AddContact extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _newContact: ContactField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_newContact(newContact: ContactField): void {
        this._newContact = newContact;
    }

    async run(): Promise<sql.IProcedureResult<ContactField> | undefined> {
        if (this._connectionPool !== undefined && this._newContact !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("name", sql.NVarChar(100), this._newContact.name)
                    .input("phone", sql.NVarChar(15), this._newContact.phone)
                    .input("address", sql.NVarChar(100), this._newContact.address)
                    .input("userId", sql.Numeric, this._newContact.userId)
                    .execute<ContactField>('AddContact');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_AddContact;
