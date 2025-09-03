import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderField, OrderPaymentMethodField, OrderContactField } from '@src/dataStruct/order';

class MutateDB_AddOrderWithTransaction extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _newOrder: OrderField | undefined;
    private _newOrderPaymentMethod: OrderPaymentMethodField | undefined;
    private _newOrderContact: OrderContactField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_newOrder(newOrder: OrderField): void {
        this._newOrder = newOrder;
    }

    set_newOrderPaymentMethod(newOrderPaymentMethod: OrderPaymentMethodField): void {
        this._newOrderPaymentMethod = newOrderPaymentMethod;
    }

    set_newOrderContact(newOrderContact: OrderContactField): void {
        this._newOrderContact = newOrderContact;
    }

    async run(): Promise<sql.IProcedureResult<OrderField> | undefined> {
        if (this._connectionPool !== undefined && this._newOrder !== undefined && this._newOrderPaymentMethod !== undefined && this._newOrderContact !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("title", sql.NVarChar(255), this._newOrder.title)
                    .input("image", sql.NVarChar(255), this._newOrder.image)
                    .input("name", sql.NVarChar(255), this._newOrder.name)
                    .input("size", sql.NVarChar(255), this._newOrder.size)
                    .input("amount", sql.NVarChar(255), this._newOrder.amount)
                    .input("discount", sql.NVarChar(255), this._newOrder.discount)
                    .input("fishCodeInProduct", sql.NVarChar(255), this._newOrder.fishCodeInProduct)
                    .input("price", sql.NVarChar(255), this._newOrder.price)
                    .input("userId", sql.Int, this._newOrder.userId)
                    .input("productId", sql.Int, this._newOrder.productId)
                    .input("sellerId", sql.Int, this._newOrder.sellerId)
                    .input("paymentMethod", sql.NVarChar(255), this._newOrderPaymentMethod.method)
                    .input("paymentInfo", sql.NVarChar(sql.MAX), this._newOrderPaymentMethod.infor)
                    .input("isPay", sql.Bit, this._newOrderPaymentMethod.isPay)
                    .input("myName", sql.NVarChar(100), this._newOrderContact.name)
                    .input("myPhone", sql.NVarChar(15), this._newOrderContact.phone)
                    .input("address", sql.Bit, this._newOrderContact.address)
                    .input("contactId", sql.Int, this._newOrderContact.contactId)
                    .execute('AddOrderWithTransaction');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_AddOrderWithTransaction;
