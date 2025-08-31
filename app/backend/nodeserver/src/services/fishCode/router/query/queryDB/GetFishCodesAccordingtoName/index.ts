import sql from 'mssql';
import { QueryDB } from '@src/services/fishCode/interface';
import { FishCodeField } from '@src/dataStruct/fishCode';


interface TotalCountField {
    totalCount: number;
}

type FishCodeQueryResult = {
    recordsets: [FishCodeField[], TotalCountField[]];
    recordset: FishCodeField[]; // tập đầu tiên
    rowsAffected: number[];
    output: Record<string, unknown>;
};

class QueryDB_Get_FishCodesAccordingtoName extends QueryDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _page: number = 1;
    private _size: number = 10;

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

    async run(): Promise<FishCodeQueryResult | void> {
        if (this._connectionPool !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("page", sql.Int, this._page)
                    .input("size", sql.Int, this._size)
                    .execute('GetFishCodesAccordingtoName');
                    
                return result as unknown as FishCodeQueryResult;
            } catch (error) {
                console.error(error);
            }
        }
    }
}



export default QueryDB_Get_FishCodesAccordingtoName;
