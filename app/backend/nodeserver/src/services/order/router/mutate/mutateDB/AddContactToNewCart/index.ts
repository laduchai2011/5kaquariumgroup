import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderContactField } from '@src/dataStruct/order';

class MutateDB_AddContactToNewCart extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _orderContact: OrderContactField | undefined;
 

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_orderContact(orderContact: OrderContactField): void {
        this._orderContact = orderContact;
    }

    async run(): Promise<sql.IProcedureResult<OrderContactField> | undefined> {
        if (this._connectionPool !== undefined && this._orderContact !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("myName", sql.NVarChar(100), this._orderContact.name)
                    .input("myPhone", sql.NVarChar(15), this._orderContact.phone)
                    .input("address", sql.NVarChar(255), this._orderContact.address)
                    .input("contactId", sql.Int, this._orderContact.contactId)
                    .input("orderId", sql.Int, this._orderContact.orderId)
                    .execute('AddContactToNewCart');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_AddContactToNewCart;
