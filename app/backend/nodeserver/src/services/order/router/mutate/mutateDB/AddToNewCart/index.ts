import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderField, AddToNewCartBodyType } from '@src/dataStruct/order';

class MutateDB_AddToNewCart extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _addToNewCartBodyType: AddToNewCartBodyType | undefined;
 

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_addToNewCartBody(addToNewCartBody: AddToNewCartBodyType): void {
        this._addToNewCartBodyType = addToNewCartBody;
    }

    async run(): Promise<sql.IProcedureResult<OrderField> | undefined> {
        if (this._connectionPool !== undefined && this._addToNewCartBodyType !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("label", sql.NVarChar(255), this._addToNewCartBodyType.order.label)
                    .input("total", sql.NVarChar(255), this._addToNewCartBodyType.order.total)
                    .input("note", sql.NVarChar(255), this._addToNewCartBodyType.order.note)
                    .input("userId", sql.Int, this._addToNewCartBodyType.order.userId)
                    .input("title", sql.NVarChar(255), this._addToNewCartBodyType.product.title)
                    .input("image", sql.NVarChar(255), this._addToNewCartBodyType.product.image)
                    .input("name", sql.NVarChar(255), this._addToNewCartBodyType.product.name)
                    .input("size", sql.NVarChar(255), this._addToNewCartBodyType.product.size)
                    .input("amount", sql.NVarChar(255), this._addToNewCartBodyType.product.amount)
                    .input("discount", sql.NVarChar(255), this._addToNewCartBodyType.product.discount)
                    .input("fishCodeInProduct", sql.NVarChar(255), this._addToNewCartBodyType.product.fishCodeInProduct)
                    .input("price", sql.NVarChar(255), this._addToNewCartBodyType.product.price)
                    .input("productId", sql.Int, this._addToNewCartBodyType.product.productId)
                    .input("sellerId", sql.Int, this._addToNewCartBodyType.product.sellerId)
                    .input("paymentMethod", sql.NVarChar(255), this._addToNewCartBodyType.payment.method)
                    .input("paymentInfo", sql.NVarChar(sql.MAX), this._addToNewCartBodyType.payment.infor)
                    .input("isPay", sql.Bit, this._addToNewCartBodyType.payment.isPay)
                    .input("myName", sql.NVarChar(100), this._addToNewCartBodyType.contact.name)
                    .input("myPhone", sql.NVarChar(15), this._addToNewCartBodyType.contact.phone)
                    .input("address", sql.Bit, this._addToNewCartBodyType.contact.address)
                    .input("contactId", sql.Int, this._addToNewCartBodyType.contact.contactId)
                    .execute('AddToNewCart');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_AddToNewCart;
