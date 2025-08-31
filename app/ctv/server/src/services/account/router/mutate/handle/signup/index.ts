import { mssql_server } from '@src/connect';
import sql from 'mssql';
import { Request, Response, NextFunction } from 'express';
import MutateDB_Signup from '../../mutateDB/signup';
import my_interface from '@src/interface';
import { AccountField } from '@src/dataStruct/account';

class Handle_Signup {
    private _mssql_server = mssql_server;
    private _mutateDB_signup;
    private _connection_pool: sql.ConnectionPool | undefined;

    constructor() {
        this._mutateDB_signup = new MutateDB_Signup();
    }

    setup = (req: Request<Record<string, never>, unknown, AccountField>, res: Response, next: NextFunction) => {
        const signupInfor = req.body;

        const resData: my_interface['router_res_type'] = {
            message: '',
            status: '',
            error: '',
            data: '',
        };

        this._connection_pool = this._mssql_server.get_connectionPool();
        if (this._connection_pool !== undefined) {
            this._mutateDB_signup.set_connection_pool(this._connection_pool);
            this._mutateDB_signup.set_data(signupInfor);
            next();
        } else {
            resData.message = 'Connect BD(mssql) NOT successly !';
            resData.status = 'error';
            resData.error = null;
            resData.data = null;
            res.json(resData);
        }
    };

    isAccountCheckUserName = async (
        req: Request<Record<string, never>, unknown, AccountField>,
        res: Response,
        next: NextFunction
    ) => {
        const signupInfor = req.body;

        const resData: my_interface['router_res_type'] = {
            message: '',
            status: '',
            error: '',
            data: '',
        };

        const is = await this._mutateDB_signup.isAccountCheckUserName(signupInfor.userName);

        if (is) {
            resData.message = 'User name is used !';
            resData.status = 'notify';
            resData.error = null;
            resData.data = null;
            res.json(resData);
        } else {
            next();
        }
    };

    isAccountCheckPhone = async (
        req: Request<Record<string, never>, unknown, AccountField>,
        res: Response,
        next: NextFunction
    ) => {
        const signupInfor = req.body;

        const resData: my_interface['router_res_type'] = {
            message: '',
            status: '',
            error: '',
            data: '',
        };

        const is = await this._mutateDB_signup.isAccountCheckPhone(signupInfor.phone);

        if (is) {
            resData.message = 'Phone number is used !';
            resData.status = 'notify';
            resData.error = null;
            resData.data = null;
            res.json(resData);
        } else {
            next();
        }
    };

    main = async (req: Request<Record<string, never>, unknown, AccountField>, res: Response) => {
        const resData: my_interface['router_res_type'] = {
            message: '',
            status: '',
            error: '',
            data: '',
        };

        // const connection_pool = this._mssql_server.get_connectionPool();
        if (this._connection_pool !== undefined) {
            // this._mutateDB_signup.set_connection_pool(connection_pool);
            // this._mutateDB_signup.set_data(signupInfor);
            try {
                const result = await this._mutateDB_signup.run();
                resData.message = 'Signup success !';
                resData.status = 'success';
                resData.error = null;
                resData.data = result;
            } catch (error) {
                resData.message = 'Signup failure !';
                resData.status = 'failure';
                resData.error = error;
                resData.data = null;
            }
        }

        res.json(resData);
    };
}

export default Handle_Signup;
