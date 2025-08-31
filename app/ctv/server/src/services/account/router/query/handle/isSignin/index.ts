
import { Request, Response } from 'express';
import { MyResponse } from '@src/dataStruct/response';
import { verifyRefreshToken } from '@src/token';


const myResponse: MyResponse<number> = {
        isSuccess: false
    };

class Handle_IsSignin {

    main = async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;
     
        if (typeof refreshToken === 'string') {
            const verify_refreshToken = verifyRefreshToken(refreshToken);

            if (verify_refreshToken && verify_refreshToken.id) {
                myResponse.data = verify_refreshToken.id
                myResponse.isSuccess = true
                myResponse.isSignin = true
            } else {
                myResponse.isSignin = false
            }
        } else {
            myResponse.isSignin = false
        }
       
        res.json(myResponse)
    };
}

export default Handle_IsSignin;
