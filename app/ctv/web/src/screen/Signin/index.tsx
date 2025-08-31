import { useState, useEffect } from 'react';
import style from './style.module.scss';
import { ACCOUNT, PASSWORD, SIGNIN } from '@src/const/text';
import { signin_infor_type } from './type';
import axiosInstance from '@src/api/axiosInstance';
import { MyResponse } from '@src/dataStruct/response';
import { AccountField } from '@src/dataStruct/account';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@src/redux';

const Signin = () => {
    const navigate = useNavigate();
    const isSignin: boolean = useSelector((state: RootState) => state.appSlice.isSignin);
    const [signinInfor, setSigninInfor] = useState<signin_infor_type>({
        userName: '',
        password: ''
    })

    useEffect(() => {
        if (isSignin) {
            navigate('/')
        }
    }, [navigate, isSignin])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value
        if (type==='userName') {
            setSigninInfor({...signinInfor, userName: value})
        }
        if (type==='password') {
             setSigninInfor({...signinInfor, password: value})
        }
    }

    const handleSignin = () => {
        fetchSignin()
    }

    const fetchSignin = async () => {
        try {
            const payload = {...signinInfor};
            const response = await axiosInstance.post<MyResponse<AccountField>>(
                `/api/service_account/mutate/signin`,
                payload
            );
            const resData = response.data;
            console.log(resData)
            if (resData.isSuccess) {
                window.location.reload();
            } else {
                console.error('Đăng nhập thất bại:', resData.message);
            }
        } catch (error) {
            console.error(error);
        } 
    }

    return (
        <div className={style.parent}>
            <div>
                <div>
                    <div>
                        <span>{ ACCOUNT }</span>
                        <input value={signinInfor.userName} onChange={(e) => handleInput(e, 'userName')} />
                    </div>
                    <div>
                        <span>{ PASSWORD }</span>
                        <input value={signinInfor.password} onChange={(e) => handleInput(e, 'password')} type="password" />
                    </div>
                    <div>
                        <button onClick={() => handleSignin()}>{ SIGNIN }</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
