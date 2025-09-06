import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { OrderProductField } from '@src/dataStruct/order';
import MutateDB_AddProductToNewCart from '../../mutateDB/AddProductToNewCart';




class Handle_AddProductToNewCart {
    private _mssql_server = mssql_server;

    constructor() {}


    main = async (req: Request<Record<string, never>, unknown, OrderProductField>, res: Response) => {
        const orderProduct = req.body;

        const myResponse: MyResponse<OrderProductField> = {
            isSuccess: false
        };

        const mutateDB_addProductToNewCart = new MutateDB_AddProductToNewCart();
        mutateDB_addProductToNewCart.set_orderProduct(orderProduct)

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_addProductToNewCart.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_addProductToNewCart.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                const data = result.recordset[0]
                myResponse.message = 'Thêm sản phẩm vào giỏ hàng thành công !';
                myResponse.isSuccess = true;
                myResponse.data = data;
                return res.json(myResponse);
            } else {
                myResponse.message = 'Thêm sản phẩm vào giỏ hàng KHÔNG thành công !';
                return res.status(204).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Thêm sản phẩm vào giỏ hàng KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_AddProductToNewCart;
