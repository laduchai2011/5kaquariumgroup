import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_Contacts from '../../queryDB/GetContacts';
import { MyResponse } from '@src/dataStruct/response';
import { ContactField } from '@src/dataStruct/account';
import { verifyRefreshToken } from '@src/token';


class Handle_Get_Contacts {
    private _mssql_server = mssql_server;

    constructor() {}

    main = async (req: Request, res: Response) => {
        const myResponse: MyResponse<ContactField[]> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        let userId = -1;

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

            if (verify_refreshToken && verify_refreshToken.id) {
               userId = verify_refreshToken.id;
            } else {
                myResponse.isSignin = false;
                return res.status(500).json(myResponse);
            }
        } else {
            myResponse.isSignin = false;
            return res.status(500).json(myResponse);
        }

        const queryDB_contacts = new QueryDB_Contacts();

        if (userId && !isNaN(Number(userId)) && userId !== -1) {
            queryDB_contacts.setUserId(Number(userId))
        } else {
            myResponse.message = 'Id người dùng không chính xác !';
            return res.status(500).json(myResponse);
        }

        const conn = this._mssql_server.get_connectionPool();
        if (conn) {
            queryDB_contacts.set_connection_pool(conn)
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !';
            return res.status(500).json(myResponse);
        }

        const result = await queryDB_contacts.run();
        if (result?.recordset.length && result?.recordset.length > 0) {
            myResponse.data = result?.recordset;
            myResponse.message = 'Lấy dữ liệu thành công !';
            myResponse.isSuccess = true;
            return res.status(200).json(myResponse);
        } else {
            myResponse.message = 'Không có dữ liệu nào được tìm thấy !';
            myResponse.isSuccess = true;
            myResponse.data = [];
            return res.status(204).json(myResponse);
        }
    };
}

export default Handle_Get_Contacts;
