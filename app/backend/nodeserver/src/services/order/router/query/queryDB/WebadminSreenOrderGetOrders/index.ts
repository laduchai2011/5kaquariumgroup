import sql from 'mssql';
import { QueryDB } from '@src/services/order/interface';
import { OrderField, AdminOrderBodyType } from '@src/dataStruct/order';


interface TotalCountField {
    totalCount: number;
}

type OrderQueryResult = {
    recordsets: [OrderField[], TotalCountField[]];
    recordset: OrderField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_WebadminSreenOrderGetOrders extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _orderBody: AdminOrderBodyType | undefined;


    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setOrderBody(orderBody: AdminOrderBodyType): void {
        this._orderBody = orderBody;
    }

    async run(): Promise<OrderQueryResult | void> {
        if (this._connectionPool !== undefined && this._orderBody !==undefined) {
            try {
                const isProcess = this._orderBody.isProcess
                let isOrder: boolean | null = null;
                let isConfirm: boolean | null = null;
                let isSend: boolean | null = null;
                let isReceive: boolean | null = null;
                if (isProcess) {
                    isOrder = this._orderBody.process.isOrder;
                    isConfirm = this._orderBody.process.isConfirm;
                    isSend = this._orderBody.process.isSend;
                    isReceive = this._orderBody.process.isReceive;
                }
                const result = await this._connectionPool
                    .request()
                    .input("page", sql.Int, this._orderBody.page)
                    .input("size", sql.Int, this._orderBody.size)
                    .input("isOrder", sql.Bit, isOrder)
                    .input("isConfirm", sql.Bit, isConfirm)
                    .input("isSend", sql.Bit, isSend)
                    .input("isReceive", sql.Bit, isReceive)
                    .execute('WebadminSreenOrderGetOrders')
                    
                return result as unknown as OrderQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_WebadminSreenOrderGetOrders;
