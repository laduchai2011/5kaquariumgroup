import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import QueryDB_Login from '../../queryDB/login';
import ServiceRedis from '@src/cache/cacheRedis';
import { MyResponse } from '@src/dataStruct/response';
import { generateAccessToken, generateRefreshToken } from '@src/token';
import { SignOptions } from 'jsonwebtoken';
import { MyJwtPayload } from '@src/token';
import { StoreAuthToken } from '@src/auth';


const serviceRedis = new ServiceRedis()

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

class Handle_Login {
    private _mssql_server = mssql_server;
    private _queryDB_login;

    constructor() {
        this._queryDB_login = new QueryDB_Login();
    }

    main = async (req: Request, res: Response) => {
        const userName = req.query.userName as string;
        const password = req.query.password as string;

        const myResponse: MyResponse<unknown> = {
            isSuccess: false
        };

        let userName_isString: boolean = false;
        let password_isString: boolean = false;
        let connection_pool_isExist: boolean = false;

        if (typeof userName === 'string') {
            userName_isString = true;
        } else {
            myResponse.message = 'Parameter "userName" is NOT string !';
        }

        if (typeof password === 'string') {
            password_isString = true;
        } else {
            myResponse.message = 'Parameter "password" is NOT string !';
        }

        if (userName_isString && password_isString) {
            this._queryDB_login.set_infor_input({userName: userName, password: password});
        }

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool !== undefined) {
            connection_pool_isExist = true;
            this._queryDB_login.set_connection_pool(connection_pool);
            myResponse.message = 'Connect BD(mssql) successly, but NOT yet login !';
        } else {
            myResponse.message = 'Connect BD(mssql) NOT successly !';
        }

        if (userName_isString && password_isString && connection_pool_isExist) {
            try {
                const result = await this._queryDB_login.run();

                if (result?.recordset.length && result?.recordset.length > 0) {
                    const myJwtPayload: MyJwtPayload = {
                        id: result.recordset[0].id
                    }

                    const signOptions_accessToken: SignOptions = {
                        expiresIn: '5m',
                    };
                    const signOptions_refreshToken: SignOptions = {
                        expiresIn: '1y',
                    };

                    const accessToken = generateAccessToken(myJwtPayload, signOptions_accessToken)
                    const refreshToken = generateRefreshToken(myJwtPayload, signOptions_refreshToken)
                    
                    const storeAuthToken: StoreAuthToken = {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        grayAccessToken: accessToken,
                        blackList: [],
                    }

                    res.cookie('id', result.recordset[0].id, {
                        httpOnly: true,
                        secure: secure_cookie,
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                        // signed: true
                    }).cookie('accessToken', accessToken, {
                        httpOnly: true, 
                        secure: secure_cookie,
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    }).cookie('accessToken', refreshToken, {
                        httpOnly: true, 
                        secure: secure_cookie,
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    })

                    myResponse.message = 'Login successly !';
                    myResponse.isSuccess = true;
                    myResponse.data = result
                } else {
                    myResponse.message = 'Login NOT successly, account or password is incorrect !';
                }
            } catch (error) {
                console.error(error)
                myResponse.message = 'Login NOT successly 6 !';
                myResponse.err = error
            }
        }

        res.json(myResponse);
    };
}

export default Handle_Login;
