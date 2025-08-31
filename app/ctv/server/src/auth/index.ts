import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, verifyRefreshToken , generateAccessToken } from '@src/token';
import { serviceRedlock } from '@src/connect';
import { SignOptions } from 'jsonwebtoken';
import ServiceRedis from '@src/cache/cacheRedis';
import LockError from 'redlock';
import { MyResponse } from '@src/dataStruct/response';


export interface StoreAuthToken {
    accessToken: string,
    refreshToken: string,
    grayAccessToken: string 
    blackList: string[],
}

const serviceRedis = new ServiceRedis()

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

const timeExpireat = 60*60*24*30*12; // 1 year

async function authentication(req: Request, res: Response, next: NextFunction) {
    const { refreshToken, accessToken, id } = req.cookies;
    const keyServiceRedis = `token-storeAuthToken-${id}`;
    const lockKey = `redlock-for-refresh-accessToken-${id}`;

    const verify_accessToken = verifyAccessToken(accessToken);
    const verify_refreshToken = verifyRefreshToken(refreshToken);

    const myResponse: MyResponse<unknown> = {
        isSuccess: false
    };

    if (verify_accessToken) {
        next();
    } else {
        const storeAuthToken = await serviceRedis.getData<StoreAuthToken>(keyServiceRedis)
        let blackList = storeAuthToken.blackList;
        if (blackList.length < 50) {
            blackList.push(accessToken)
        } else {
            blackList = [accessToken]
        }
        storeAuthToken.blackList = blackList;
        storeAuthToken.grayAccessToken = accessToken
        if (verify_refreshToken && storeAuthToken.refreshToken===refreshToken) {
            try {
                //---------------------xử lý token hết han--------------------/
                const lock = await serviceRedlock.acquire([lockKey], 30000); 

                const myJwtPayload = verify_refreshToken;
                const signOptions: SignOptions = {
                    expiresIn: '5m',
                };
                const new_accessToken = generateAccessToken(myJwtPayload, signOptions)
                storeAuthToken.accessToken = new_accessToken

                res.cookie('id', id, {
                    httpOnly: true,
                    secure: secure_cookie,
                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                    // signed: true
                }).cookie('accessToken', new_accessToken, {
                    httpOnly: true, 
                    secure: secure_cookie,
                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                })

                await serviceRedis.setData<StoreAuthToken>(keyServiceRedis, storeAuthToken, timeExpireat)

                await lock.release();
                next();
            //----------------------------------------------------------/
            } catch (err) {
                if (err instanceof LockError) {
                    //--------------------Tiếp tục thực hiện những request cùng thời điểm------------------------//
                    if (storeAuthToken.grayAccessToken === accessToken) {
                        next();
                    } else {
                        myResponse.isSignin = false;
                        myResponse.message = "Tài khoản của bạn bị tấn công, hãy đăng nhập lại !"
                        res.json(myResponse)
                    }
                    //----------------------------------------------------------------------------------------//
                } else {
                    throw err;
                }
            }
        } else {
            myResponse.isSignin = false;
            myResponse.message = "Tài khoản của bạn bị tấn công, hãy đăng nhập lại !"
            res.json(myResponse)
        }
    }
}

export default authentication;
