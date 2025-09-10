import sql from 'mssql';
import { MutateDB } from '@src/services/order/interface';
import { OrderField, GetMyOrderBodyType } from '@src/dataStruct/order';

interface TotalCountField {
    totalCount: number;
}

type OrderQueryResult = {
    recordsets: [OrderField[], TotalCountField[]];
    recordset: OrderField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class MutateDB_WebappSreenMyOrderGetMyOrders extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _myOrder: GetMyOrderBodyType | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setMyOrder(myOrder: GetMyOrderBodyType): void {
        this._myOrder = myOrder;
    }

    async run(): Promise<OrderQueryResult | void> {
        if (this._connectionPool !== undefined && this._myOrder !== undefined) {
            try {
                const isProcess = this._myOrder.isProcess
                let isOrder: boolean | null = null;
                let isConfirm: boolean | null = null;
                let isSend: boolean | null = null;
                let isReceive: boolean | null = null;
                if (isProcess) {
                    isOrder = this._myOrder.process.isOrder;
                    isConfirm = this._myOrder.process.isConfirm;
                    isSend = this._myOrder.process.isSend;
                    isReceive = this._myOrder.process.isReceive;
                }
                const result = await this._connectionPool
                    .request()
                    .input("page", sql.Int, this._myOrder.page)
                    .input("size", sql.Int, this._myOrder.size)
                    .input("isOrder", sql.Bit, isOrder)
                    .input("isConfirm", sql.Bit, isConfirm)
                    .input("isSend", sql.Bit, isSend)
                    .input("isReceive", sql.Bit, isReceive)
                    .input("userId", sql.Int, this._myOrder.order.userId)
                    .execute('WebappSreenMyOrderGetMyOrders');
                
                return result as unknown as OrderQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}


export default MutateDB_WebappSreenMyOrderGetMyOrders;
