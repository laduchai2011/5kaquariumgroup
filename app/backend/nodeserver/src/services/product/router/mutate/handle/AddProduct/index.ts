import { mssql_server } from '@src/connect';
import { Request, Response, NextFunction } from 'express';
import MutateDB_AddProduct from '../../mutateDB/AddProduct';
import { ProductField } from '@src/dataStruct/product';
import { MyResponse } from '@src/dataStruct/response';
import { verifyRefreshToken } from '@src/token';

class Handle_AddProduct {
    private _mssql_server = mssql_server;

    constructor() {}

    setup = async (req: Request<Record<string, never>, unknown, ProductField>, res: Response, next: NextFunction) => {
        const myResponse: MyResponse<ProductField> = {
            isSuccess: false
        };

        await this._mssql_server.init()

        const newProduct = req.body;
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

            const { id } = verify_refreshToken;
            newProduct.userId = id;
            res.locals.newProduct = newProduct;

            next();
        } else {
            myResponse.message = 'Vui lòng đăng nhập lại !';
            return res.status(500).json(myResponse);
        }
    };

    main = async (_: Request<Record<string, never>, unknown, ProductField>, res: Response) => {
        const newProduct = res.locals.newProduct as ProductField;

        const myResponse: MyResponse<ProductField> = {
            isSuccess: false
        };

        const mutateDB_addProduct = new MutateDB_AddProduct();
        mutateDB_addProduct.set_newProduct(newProduct);

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool) {
            mutateDB_addProduct.set_connection_pool(connection_pool);
        } else {
            myResponse.message = 'Kết nối cơ sở dữ liệu không thành công !'
            return res.status(500).json(myResponse);
        }

        try {
            const result = await mutateDB_addProduct.run();
            if (result?.recordset.length && result?.recordset.length > 0) {
                myResponse.message = 'Thêm sản phẩm thành công !';
                myResponse.isSuccess = true;
                myResponse.data = result?.recordset[0];
                return res.json(myResponse);
            } else {
                myResponse.message = 'Thêm sản phẩm KHÔNG thành công !';
                return res.status(500).json(myResponse);
            }
        } catch (error) {
            myResponse.message = 'Thêm sản phẩm KHÔNG thành công !';
            myResponse.err = error;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_AddProduct;
