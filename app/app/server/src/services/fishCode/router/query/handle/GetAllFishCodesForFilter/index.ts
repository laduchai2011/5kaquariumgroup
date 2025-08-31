import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_Get_AllFishCodesForFilter from '../../queryDB/GetAllFishCodesForFilter';
import { MyResponse } from '@src/dataStruct/response';
import { FishCodeForFilterField } from '@src/dataStruct/fishCode';



class Handle_Get_AllFishCodesForFilter {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, unknown, {page: string, size: string}>, res: Response) => {
        const myResponse: MyResponse<FishCodeForFilterField[]> = {
            isSuccess: false
        };
            
        await this._mssql_server.init()

        const queryDB_get_allFishCodesForFilter = new QueryDB_Get_AllFishCodesForFilter();

        const conn = this._mssql_server.get_connectionPool();

        if (conn) {
            queryDB_get_allFishCodesForFilter.set_connection_pool(conn)
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            return res.status(500).json(myResponse);
        }

        const result = await queryDB_get_allFishCodesForFilter.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            myResponse.data = result.recordset
            myResponse.message = 'Lấy dữ liệu thành công !';
            myResponse.isSuccess = true;
            return res.json(myResponse);
        } else {
            myResponse.message = 'Không có dữ liệu nào được tìm thấy !';
            myResponse.isSuccess = true;
            return res.json(myResponse);
        }
    };
}

export default Handle_Get_AllFishCodesForFilter;
