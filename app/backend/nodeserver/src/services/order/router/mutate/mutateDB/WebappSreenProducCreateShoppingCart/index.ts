import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderField } from '@src/dataStruct/order';

class MutateDB_WebappSreenProducCreateShoppingCart extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _order: OrderField | undefined;
 

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_order(order: OrderField): void {
        this._order = order;
    }

    async run(): Promise<sql.IProcedureResult<OrderField> | undefined> {
        if (this._connectionPool !== undefined && this._order !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("label", sql.NVarChar(255), this._order.label)
                    .input("total", sql.NVarChar(255), this._order.total)
                    .input("note", sql.NVarChar(255), this._order.note)
                    .input("userId", sql.Int, this._order.userId)
                    .execute('WebappSreenProducCreateShoppingCart');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_WebappSreenProducCreateShoppingCart;
