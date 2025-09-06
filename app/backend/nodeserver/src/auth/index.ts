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

const serviceRedis = ServiceRedis.getInstance()
// serviceRedis.init();

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

const sameSite = process.env.NODE_ENV === 'development' ? 'lax' : 'none';

const timeExpireat = 60*60*24*30*12; // 1 year

async function authentication(req: Request, res: Response, next: NextFunction) {
    const { refreshToken, accessToken, id } = req.cookies;
    const keyServiceRedis = `token-storeAuthToken-${id}`;
    const lockKey = `redlock-for-refresh-accessToken-${id}`;

    const myResponse: MyResponse<unknown> = {
        isSuccess: false
    };

    try {
        await serviceRedis.init();

        // console.log("1. Bắt đầu middleware");
        const verify_accessToken = verifyAccessToken(accessToken);
        // console.log("2. Đã verify accessToken:", verify_accessToken);
        const verify_refreshToken = verifyRefreshToken(refreshToken);
        // console.log("3. Đã verify refreshToken:", verify_refreshToken);

        
        if (verify_accessToken === "invalid") {
            myResponse.message = "Access-Token không hợp lệ, hãy đăng nhập lại !"
            return res.json(myResponse);
        }

        if (verify_refreshToken === "invalid") {
            myResponse.message = "Refresh-Token không hợp lệ, hãy đăng nhập lại !"
            return res.json(myResponse);
        }

        if (verify_refreshToken === "expired") {
            myResponse.message = "Refresh-Token hết hạn, hãy đăng nhập lại !"
            return res.json(myResponse);
        }

        if (verify_accessToken && verify_accessToken !== "expired") {
            return next();
        } else {
            const storeAuthToken = await serviceRedis.getData<StoreAuthToken>(keyServiceRedis)
            // console.log("4. Lấy storeAuthToken từ Redis:", storeAuthToken);
            let blackList = storeAuthToken.blackList;
            if (blackList.length < 50) {
                blackList.push(accessToken)
            } else {
                blackList = [accessToken]
            }
            storeAuthToken.blackList = blackList;
            storeAuthToken.grayAccessToken = accessToken
            if (verify_refreshToken && storeAuthToken.refreshToken===refreshToken) {
                let lock;
                try {
                    //---------------------xử lý token hết han--------------------/
                    lock = await serviceRedlock.acquire([lockKey], 30000); 

                    const myJwtPayload = verify_refreshToken;
                    const signOptions: SignOptions = {
                        expiresIn: '5m',
                    };
                    const new_accessToken = generateAccessToken(myJwtPayload, signOptions)
                    storeAuthToken.accessToken = new_accessToken

                    if (process.env.NODE_ENV === 'development') {
                        res.cookie('id', id, {
                            httpOnly: true,
                            secure: secure_cookie,
                            sameSite: sameSite,
                            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                            // signed: true
                        }).cookie('accessToken', new_accessToken, {
                            httpOnly: true, 
                            secure: secure_cookie,
                            sameSite: sameSite,
                            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                        })
                    } else {
                        res.cookie('id', id, {
                            httpOnly: true,
                            secure: secure_cookie,
                            sameSite: sameSite,
                            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                            domain: '.5kaquarium.com'
                            // signed: true
                        }).cookie('accessToken', new_accessToken, {
                            httpOnly: true, 
                            secure: secure_cookie,
                            sameSite: sameSite,
                            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                            domain: '.5kaquarium.com'
                        })
                    }

                    await serviceRedis.setData<StoreAuthToken>(keyServiceRedis, storeAuthToken, timeExpireat)

                    await lock.release();
                    return next();
                //----------------------------------------------------------/
                } catch (err) {
                    if (err instanceof LockError) {
                        //--------------------Tiếp tục thực hiện những request cùng thời điểm------------------------//
                        if (storeAuthToken.grayAccessToken === accessToken) {
                            return next();
                        } else {
                            myResponse.isSignin = false;
                            myResponse.message = "Tài khoản của bạn bị tấn công, hãy đăng nhập lại !"
                            res.json(myResponse)
                        }
                        //----------------------------------------------------------------------------------------//
                    } else {
                        console.error(err)
                        // throw err;
                    }
                } finally {
                    if (lock) {
                        try {
                            await lock.release();
                        } catch (e) {
                            console.error("Không thể release lock:", e);
                        }
                    }
                }
            } else {
                myResponse.isSignin = false;
                myResponse.message = "Tài khoản của bạn bị tấn công, hãy đăng nhập lại !"
                return res.json(myResponse)
            }
        }
    } catch (error) {
        myResponse.err = error;
        return res.json(myResponse)
    }
}

export default authentication;
