import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderPaymentField } from '@src/dataStruct/order';

class MutateDB_AddPaymentToNewCart extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _orderPayment: OrderPaymentField | undefined;
 

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_orderPayment(orderPayment: OrderPaymentField): void {
        this._orderPayment = orderPayment;
    }

    async run(): Promise<sql.IProcedureResult<OrderPaymentField> | undefined> {
        if (this._connectionPool !== undefined && this._orderPayment !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("paymentMethod", sql.NVarChar(255), this._orderPayment.method)
                    .input("paymentInfo", sql.NVarChar(sql.MAX), this._orderPayment.infor)
                    .input("isPay", sql.Bit, this._orderPayment.isPay)
                    .input("orderId", sql.Int, this._orderPayment.orderId)
                    .execute('AddPaymentToNewCart');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_AddPaymentToNewCart;
