import { mssql_server } from '@src/connect';
import { Request, Response } from 'express';
import MutateDB_Signin from '../../mutateDB/signin';
import ServiceRedis from '@src/cache/cacheRedis';
import { MyResponse } from '@src/dataStruct/response';
import { generateAccessToken, generateRefreshToken } from '@src/token';
import { SignOptions } from 'jsonwebtoken';
import { MyJwtPayload } from '@src/token';
import { StoreAuthToken } from '@src/auth';
import { signin_infor_type } from './type';
import { AccountField } from '@src/dataStruct/account';


const serviceRedis = new ServiceRedis()

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

const sameSite = process.env.NODE_ENV === 'development' ? 'lax' : 'none';

const timeExpireat = 60*60*24*30*12; // 1 year

class Handle_Signin {
    private _mssql_server = mssql_server;
    private _mutateDB_signin;

    constructor() {
        this._mutateDB_signin = new MutateDB_Signin();
    }

    main = async (req: Request<Record<string, never>, unknown, signin_infor_type>, res: Response) => {
        const signinInfor = req.body;
        const userName = signinInfor.userName;
        const password = signinInfor.password;

        const myResponse: MyResponse<AccountField> = {
            isSuccess: false
        };

        let connection_pool_isExist: boolean = false;

        this._mutateDB_signin.set_infor_input({userName: userName, password: password});

        const connection_pool = this._mssql_server.get_connectionPool();
        if (connection_pool !== undefined) {
            connection_pool_isExist = true;
            this._mutateDB_signin.set_connection_pool(connection_pool);
            myResponse.message = 'Connect BD(mssql) successly, but NOT yet login !';
        } else {
            myResponse.message = 'Connect BD(mssql) NOT successly !';
        }

        if (connection_pool_isExist) {
            try {
                const result = await this._mutateDB_signin.run();

                if (result?.recordset.length && result?.recordset.length > 0) {
                    const id = result.recordset[0].id
                    const myJwtPayload: MyJwtPayload = {
                        id: id
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

                    const keyServiceRedis = `token-storeAuthToken-${id}`;

                    await serviceRedis.setData<StoreAuthToken>(keyServiceRedis, storeAuthToken, timeExpireat)

                    res.cookie('id', id, {
                        httpOnly: true,
                        secure: secure_cookie,
                        sameSite: sameSite,
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                        // signed: true
                    }).cookie('accessToken', accessToken, {
                        httpOnly: true, 
                        secure: secure_cookie,
                        sameSite: sameSite,
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    }).cookie('refreshToken', refreshToken, {
                        httpOnly: true, 
                        secure: secure_cookie,
                        sameSite: sameSite,
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                    })

                    myResponse.message = 'Login successly !';
                    myResponse.isSuccess = true;
                    myResponse.data = result.recordset[0]
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

export default Handle_Signin;
