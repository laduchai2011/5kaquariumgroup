import React, { useState } from 'react';
import './style.css';
import axiosInstance from '@src/api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import type { MyResponse } from '@src/dataStruct/response';
import type { AccountField } from '@src/dataStruct/account';

interface SigninField {
    userName: string;
    password: string;
}

const Signin: React.FC = () => {
    const navigate = useNavigate();
    const [signin, setSignin] = useState<SigninField>({
        userName: '',
        password: '',
    });

    // useEffect(() => {
    //     const myId = sessionStorage.getItem("myId");
    //     if (myId!==null) {
    //         navigate('/')
    //     }
    // }, [navigate])

    async function fetchSignin() {
        try {
            const payload = {...signin};
            const response = await axiosInstance.post<MyResponse<AccountField>>(
                '/api/service_account/mutate/signin',
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
        }
    }

    const handleSignin = async () => {
        try {
            await fetchSignin();
            navigate('/');
        } catch (error: unknown) {
            console.error(error);
        }
    };

    return (
        <div className="Signin">
            <div>
                <div>
                    <div>Tên đăng nhập</div>
                    <input
                        value={signin.userName}
                        onChange={(e) =>
                            setSignin((pre) => {
                                return {
                                    ...pre,
                                    userName: e.target.value,
                                };
                            })
                        }
                    />
                </div>
                <div>
                    <div>Mật khẩu</div>
                    <input
                        value={signin.password}
                        onChange={(e) =>
                            setSignin((pre) => {
                                return {
                                    ...pre,
                                    password: e.target.value,
                                };
                            })
                        }
                        type="password"
                    />
                </div>
                <div>
                    <button onClick={() => handleSignin()}>Vào đi</button>
                </div>
            </div>
        </div>
    );
};

export default Signin;
