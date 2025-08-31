import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_Get_FishCodesAccordingtoName from '../../queryDB/GetFishCodesAccordingtoName';
import { MyResponse } from '@src/dataStruct/response';
import { PagedFishCodeField, FishCodeField } from '@src/dataStruct/fishCode';
import { verifyRefreshToken } from '@src/token';


class Handle_Get_FishCodes {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request<unknown, unknown, unknown, {page: string, size: string}>, res: Response) => {
        const myResponse: MyResponse<PagedFishCodeField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const page = parseInt(req.query.page, 10) || 1;
        const size = parseInt(req.query.size, 10) || 10;

        const { refreshToken } = req.cookies;
             
        if (typeof refreshToken === 'string') {
            const verify_refreshToken = verifyRefreshToken(refreshToken);

            if (verify_refreshToken === "invalid") {
                myResponse.message = "Refresh-Token không hợp lệ, hãy đăng nhập lại !"
                return res.status(500).json(myResponse);
            }

            if (verify_refreshToken === "expired") {
                myResponse.message = "Refresh-Token hết hạn, hãy đăng nhập lại !"
                return res.status(500).json(myResponse);
            }

            // if (verify_refreshToken && verify_refreshToken.id) {
            //    userId = verify_refreshToken.id;
            // } else {
            //     myResponse.isSignin = false;
            //     return res.status(500).json(myResponse);
            // }
        } else {
            myResponse.isSignin = false;
            return res.status(500).json(myResponse);
        }

        const queryDB_get_fishCodesAccordingtoName = new QueryDB_Get_FishCodesAccordingtoName();

        queryDB_get_fishCodesAccordingtoName.setSize(size);
        queryDB_get_fishCodesAccordingtoName.setPage(page);
        const conn = this._mssql_server.get_connectionPool();

        if (conn) {
            queryDB_get_fishCodesAccordingtoName.set_connection_pool(conn)
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            return res.status(500).json(myResponse);
        }

        const result = await queryDB_get_fishCodesAccordingtoName.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            const rows: FishCodeField[] = result.recordset;
            myResponse.data = {items: rows, totalCount: result.recordsets[1][0].totalCount};
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

export default Handle_Get_FishCodes;
