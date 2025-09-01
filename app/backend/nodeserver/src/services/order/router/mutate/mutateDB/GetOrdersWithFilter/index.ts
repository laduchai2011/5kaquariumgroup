import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderField, OrderFilterField } from '@src/dataStruct/order';

interface TotalCountField {
    totalCount: number;
}

type OrderQueryResult = {
    recordsets: [OrderField[], TotalCountField[]];
    recordset: OrderField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class MutateDB_GetOrdersWithFilter extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _orderFilter: OrderFilterField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setOrderFilter(orderFilter: OrderFilterField): void {
        this._orderFilter = orderFilter;
    }

    async run(): Promise<OrderQueryResult | void> {
        if (this._connectionPool !== undefined && this._orderFilter !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("page", sql.Int, this._orderFilter.page)
                    .input("size", sql.Int, this._orderFilter.size)
                    .input("isOrder", sql.Bit, this._orderFilter.orderProcess.isOrder)
                    .input("isConfirm", sql.Bit, this._orderFilter.orderProcess.isConfirm)
                    .input("isSend", sql.Bit, this._orderFilter.orderProcess.isSend)
                    .input("isReceive", sql.Bit, this._orderFilter.orderProcess.isReceive)
                    .execute('GetOrdersWithFilter');
                
                return result as unknown as OrderQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_GetOrdersWithFilter;
