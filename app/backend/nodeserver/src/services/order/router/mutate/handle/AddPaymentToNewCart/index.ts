import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderPaymentField } from '@src/dataStruct/order';
import MutateDB_AddPaymentToNewCart from '../../mutateDB/AddPaymentToNewCart';




class Handle_AddPaymentToNewCart {
    private _mssql_server = mssql_server;

    constructor() {}


    main = async (req: Request<Record<string, never>, unknown, OrderPaymentField>, res: Response) => {
        const orderPayment = req.body;

        const myResponse: MyResponse<OrderPaymentField> = {
            isSuccess: false
        };

        const mutateDB_addPaymentToNewCart = new MutateDB_AddPaymentToNewCart();
        mutateDB_addPaymentToNewCart.set_orderPayment(orderPayment);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_addPaymentToNewCart.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_addPaymentToNewCart.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0]
                myResponse.message = 'Thêm phương thức thanh toán thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                return res.json(myResponse);
            } else {
                myResponse.message = 'Thêm phương thức thanh toán KHÔNG thành công !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Thêm phương thức thanh toán KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_AddPaymentToNewCart;
