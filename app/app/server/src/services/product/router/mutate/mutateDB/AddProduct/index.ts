import sql from 'mssql';
import { MutateDB } from '@src/services/product/interface';
import { ProductField } from '@src/dataStruct/product';

class MutateDB_AddProduct extends MutateDB {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _newProduct: ProductField | undefined;

    constructor() {
        super();
    }

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    set_newProduct(newProduct: ProductField): void {
        this._newProduct = newProduct;
    }

    async run(): Promise<sql.IProcedureResult<ProductField> | undefined> {
        if (this._connectionPool !== undefined && this._newProduct !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input("title", sql.NVarChar(255), this._newProduct.title)
                    .input("image", sql.NVarChar(255), this._newProduct.image)
                    .input("name", sql.NVarChar(255), this._newProduct.name)
                    .input("size", sql.NVarChar(255), this._newProduct.size)
                    .input("amount", sql.NVarChar(255), this._newProduct.amount)
                    .input("sold", sql.NVarChar(255), this._newProduct.sold)
                    .input("discount", sql.NVarChar(255), this._newProduct.discount)
                    .input("fishCodeInProduct", sql.NVarChar(255), this._newProduct.fishCodeInProduct)
                    .input("price", sql.NVarChar(255), this._newProduct.price)
                    .input("userId", sql.Numeric, this._newProduct.userId)
                    .input("fishCodeId", sql.Numeric, this._newProduct.fishCodeId)
                    .execute<ProductField>('AddProduct');
                
                return result
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_AddProduct;
