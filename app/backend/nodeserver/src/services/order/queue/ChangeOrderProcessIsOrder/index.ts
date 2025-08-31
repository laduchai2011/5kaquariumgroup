import sql from 'mssql';
import { MutateDB } from '@src/services/product/interface';
import { OrderProcessField } from '@src/dataStruct/order';

class MutateDB_ChangeOrderProcessIsOrder extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _orderId: number | undefined;
    private _isOrder: boolean | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_orderId(orderId: number): void {
        this._orderId = orderId;
    }

    set_isOrder(isOrder: boolean): void {
        this._isOrder = isOrder;
    }

    async run(): Promise<sql.IProcedureResult<OrderProcessField> | undefined> {
        if (this._connectionPool !== undefined && this._orderId !== undefined && this._isOrder !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("orderId", sql.Int, this._orderId)
                    .input("isOrder", sql.Bit, this._isOrder)
                    .execute('ChangeOrderProcessIsOrder');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_ChangeOrderProcessIsOrder;
