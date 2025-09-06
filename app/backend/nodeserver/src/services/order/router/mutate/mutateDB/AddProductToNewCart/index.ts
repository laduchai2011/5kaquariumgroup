import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderProductField } from '@src/dataStruct/order';

class MutateDB_AddProductToNewCart extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _orderProduct: OrderProductField | undefined;
 

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_orderProduct(orderProduct: OrderProductField): void {
        this._orderProduct = orderProduct;
    }

    async run(): Promise<sql.IProcedureResult<OrderProductField> | undefined> {
        if (this._connectionPool !== undefined && this._orderProduct !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("@title", sql.NVarChar(255), this._orderProduct.title)
                    .input("@image", sql.NVarChar(255), this._orderProduct.image)
                    .input("@name", sql.NVarChar(255), this._orderProduct.name)
                    .input("size", sql.NVarChar(255), this._orderProduct.size)
                    .input("amount", sql.NVarChar(255), this._orderProduct.amount)
                    .input("discount", sql.NVarChar(255), this._orderProduct.discount)
                    .input("fishCodeInProduct", sql.NVarChar(255), this._orderProduct.fishCodeInProduct)
                    .input("price", sql.NVarChar(255), this._orderProduct.price)
                    .input("productId", sql.Int, this._orderProduct.productId)
                    .input("sellerId", sql.Int, this._orderProduct.sellerId)
                    .input("orderId", sql.Int, this._orderProduct.orderId)
                    .execute('AddProductToNewCart');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_AddProductToNewCart;
