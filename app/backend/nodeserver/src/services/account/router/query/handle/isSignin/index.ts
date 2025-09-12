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

            if (verify_refreshToken === "invalid") {
                myResponse.message = "Refresh-Token không hợp lệ, hãy đăng nhập lại !"
                return res.status(500).json(myResponse);
            }

            if (verify_refreshToken === "expired") {
                myResponse.message = "Refresh-Token hết hạn, hãy đăng nhập lại !"
                return res.status(500).json(myResponse);
            }

            if (verify_refreshToken && verify_refreshToken.id) {
                myResponse.data = verify_refreshToken.id;
                myResponse.isSuccess = true;
                myResponse.isSignin = true;
                return res.status(200).json(myResponse);
            } else {
                myResponse.isSignin = false;
                return res.status(204).json(myResponse);
            }
        } else {
            myResponse.isSignin = false;
            return res.status(500).json(myResponse);
        }
    };
}

export default Handle_IsSignin;
