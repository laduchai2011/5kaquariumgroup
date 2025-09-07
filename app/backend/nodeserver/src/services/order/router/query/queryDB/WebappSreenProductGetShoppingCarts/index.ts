import sql from 'mssql';
import { QueryDB } from '@src/services/order/interface';
import { OrderField } from '@src/dataStruct/order';


interface TotalCountField {
    totalCount: number;
}

type OrderQueryResult = {
    recordsets: [OrderField[], TotalCountField[]];
    recordset: OrderField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_WebappSreenProductGetShoppingCarts extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _userId: number | undefined;
    private _page: number = 1;
    private _size: number = 10;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setUserId(userId: number): void {
        this._userId = userId;
    }

    setPage(page: number): void {
        this._page = page;
    }

    setSize(size: number): void {
        this._size = size;
    }

    async run(): Promise<OrderQueryResult | void> {
        if (this._connectionPool !== undefined && this._userId !==undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("page", sql.Int, this._page)
                    .input("size", sql.Int, this._size)
                    .input("userId", sql.Int, this._userId)
                    .execute('WebappSreenProductGetShoppingCart')
                    
                return result as unknown as OrderQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_WebappSreenProductGetShoppingCarts;
