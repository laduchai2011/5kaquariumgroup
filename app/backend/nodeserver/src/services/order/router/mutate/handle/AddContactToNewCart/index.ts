import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderContactField } from '@src/dataStruct/order';
import MutateDB_AddContactToNewCart from '../../mutateDB/AddContactToNewCart';




class Handle_AddContactToNewCart {
    private _mssql_server = mssql_server;

    constructor() {}


    main = async (req: Request<Record<string, never>, unknown, OrderContactField>, res: Response) => {
        const orderContact = req.body;

        const myResponse: MyResponse<OrderContactField> = {
            isSuccess: false
        };

        const mutateDB_addContactToNewCart = new MutateDB_AddContactToNewCart();
        mutateDB_addContactToNewCart.set_orderContact(orderContact)

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_addContactToNewCart.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_addContactToNewCart.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0]
                myResponse.message = 'Thêm liên hệ thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                return res.json(myResponse);
            } else {
                myResponse.message = 'Thêm liên hệ KHÔNG thành công !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Thêm liên hệ KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_AddContactToNewCart;
