import sql from 'mssql';
import { QueryDB } from '@src/services/order/interface';
import { OrderProcessField } from '@src/dataStruct/order';



class QueryDB_WebappSreenMyOrderGetMyOrderProcessInOrder extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _orderId: number | undefined;
    private _userId: number | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setOrderId(orderId: number): void {
        this._orderId = orderId;
    }

    setUserId(userId: number): void {
        this._userId = userId;
    }

    async run(): Promise<sql.IProcedureResult<OrderProcessField> | void> {
        if (this._connectionPool !== undefined && this._orderId !==undefined && this._userId !==undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("orderId", sql.Int, this._orderId)
                    .input("userId", sql.Int, this._userId)
                    .execute('WebappSreenMyOrderGetMyOrderProcessInOrder')
                    
                return result 
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_WebappSreenMyOrderGetMyOrderProcessInOrder;
