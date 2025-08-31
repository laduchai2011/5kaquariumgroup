import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_Login from '../../queryDB/login';
import my_interface from '@src/interface';

class Handle_Login {
    private _mssql_server = mssql_server;
    private _queryDB_login;

    constructor() {
        this._queryDB_login = new QueryDB_Login();
    }

    main = async (req: Request, res: Response) => {
        const userName: unknown = req.query.userName;
        const password: unknown = req.query.password;

        let userName_isString: boolean = false;
        let password_isString: boolean = false;
        let connection_pool_isExist: boolean = false;

        const resData: my_interface['router_res_type'] = {
            message: '',
            status: '',
            error: '',
            data: '',
        };

        if (typeof userName === 'string') {
            userName_isString = true;
        } else {
            resData.message = 'Parameter "userName" is NOT string !';
            resData.status = 'failure';
            resData.error = null;
            resData.data = null;
        }

        if (typeof password === 'string') {
            password_isString = true;
        } else {
            resData.message = 'Parameter "password" is NOT string !';
            resData.status = 'failure';
            resData.error = null;
            resData.data = null;
        }

        if (userName_isString && password_isString) {
            this._queryDB_login.set_infor_input({ userName: userName as string, password: password as string });
        }

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool !== undefined) {
            connection_pool_isExist = true;
            this._queryDB_login.set_connection_pool(connection_pool);
            resData.message = 'Connect BD(mssql) successly, but NOT yet login !';
            resData.status = 'failure';
            resData.error = null;
            resData.data = null;
        } else {
            resData.message = 'Connect BD(mssql) NOT successly !';
            resData.status = 'warn-error';
            resData.error = null;
            resData.data = null;
        }

        if (userName_isString && password_isString && connection_pool_isExist) {
            try {
                const result = await this._queryDB_login.run();

                resData.message = 'Login successly !';
                resData.status = 'success';
                resData.error = null;
                resData.data = result;
            } catch (error) {
                resData.message = 'Login NOT successly !';
                resData.status = 'failure';
                resData.error = error;
                resData.data = null;
            }
        }

        res.json(resData);
    };
}

export default Handle_Login;
