import { useState, useEffect } from 'react';
import style from './style.module.scss';
import { ACCOUNT, PASSWORD, SIGNIN } from '@src/const/text';
import { signin_infor_type } from './type';
import axiosInstance from '@src/api/axiosInstance';
import { MyResponse } from '@src/dataStruct/response';
import { AccountField } from '@src/dataStruct/account';
import { useNavigate } from 'react-router-dom';
import NormalLoading from '@src/component/NormalLoading';

const Signin = () => {
    const navigate = useNavigate();
    const [signinInfor, setSigninInfor] = useState<signin_infor_type>({
        userName: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const myId = sessionStorage.getItem("myId");
        if (myId!==null) {
            navigate('/')
        }
    }, [navigate])

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
            setIsLoading(true);
            const payload = {...signinInfor};
            const response = await axiosInstance.post<MyResponse<AccountField>>(
                `/api/service_account/mutate/signin`,
                payload
            );
            const resData = response.data;
            if (resData.isSuccess) {
                window.location.reload();
            } else {
                console.error('Đăng nhập thất bại:', resData.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <NormalLoading />
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
