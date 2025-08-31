import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderField, OrderPaymentMethodField } from '@src/dataStruct/order';

class MutateDB_AddOrderWithTransaction extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _newOrder: OrderField | undefined;
    private _newOrderPaymentMethod: OrderPaymentMethodField | undefined;

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

    async run(): Promise<sql.IProcedureResult<OrderField> | undefined> {
        if (this._connectionPool !== undefined && this._newOrder !== undefined && this._newOrderPaymentMethod !== undefined) {
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
                    .input("userId", sql.Numeric, this._newOrder.userId)
                    .input("productId", sql.Numeric, this._newOrder.productId)
                    .input("sellerId", sql.Numeric, this._newOrder.sellerId)
                    .input("paymentMethod", sql.NVarChar(255), this._newOrderPaymentMethod.method)
                    .input("paymentInfo", sql.NVarChar(sql.MAX), this._newOrderPaymentMethod.infor)
                    .execute('AddOrderWithTransaction');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_AddOrderWithTransaction;
