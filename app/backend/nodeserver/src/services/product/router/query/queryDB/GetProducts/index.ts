import sql from 'mssql';
import { QueryDB } from '@src/services/product/interface';
import { ProductField, ProductFilterField } from '@src/dataStruct/product';


interface TotalCountField {
    totalCount: number;
}

type ProductQueryResult = {
    recordsets: [ProductField[], TotalCountField[]];
    recordset: ProductField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_Get_Products extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _page: number = 1;
    private _size: number = 10;
    private _productFilter: ProductFilterField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setPage(page: number): void {
        this._page = page;
    }

    setSize(size: number): void {
        this._size = size;
    }

    setProductFilter(productFilter: ProductFilterField): void {
        this._productFilter = productFilter;
    }

    async run(): Promise<ProductQueryResult | void> {
        if (this._connectionPool !== undefined && this._productFilter !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("page", sql.Int, this._page)
                    .input("size", sql.Int, this._size)
                    .input("fishCodeId", sql.Int, this._productFilter.fishCodeId)
                    .execute('GetProducts')
                    
                return result as unknown as ProductQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_Get_Products;
