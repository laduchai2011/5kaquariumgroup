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
                const isOrderProcess = this._orderFilter.isOrderProcess
                let isOrder: boolean | null = null;
                let isConfirm: boolean | null = null;
                let isSend: boolean | null = null;
                let isReceive: boolean | null = null;
                if (isOrderProcess) {
                    isOrder = this._orderFilter.orderProcess.isOrder;
                    isConfirm = this._orderFilter.orderProcess.isConfirm;
                    isSend = this._orderFilter.orderProcess.isSend;
                    isReceive = this._orderFilter.orderProcess.isReceive;
                }
                const result = await this._connectionPool
                    .request()
                    .input("page", sql.Int, this._orderFilter.page)
                    .input("size", sql.Int, this._orderFilter.size)
                    .input("sellerId", sql.Int, this._orderFilter.sellerId)
                    .input("isOrder", sql.Bit, isOrder)
                    .input("isConfirm", sql.Bit, isConfirm)
                    .input("isSend", sql.Bit, isSend)
                    .input("isReceive", sql.Bit, isReceive)
                    .execute('GetOrdersWithFilter');
                
                return result as unknown as OrderQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_GetOrdersWithFilter;
