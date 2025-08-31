import { useState } from 'react';
import style from './style.module.scss';
import { AccountField } from '@src/dataStruct/account';
import { MyResponse } from '@src/dataStruct/response';
import { useNavigate } from 'react-router-dom';
import { 
    isSpace, 
    isFirstNumber, 
    containsSpecialCharacters, 
    isValidPhoneNumber 
} from '@src/utility/string';
import axiosInstance from '@src/api/axiosInstance';



const Signup = () => {
    const navigate = useNavigate();

    const [account, setAccount] = useState<AccountField>({
        id: -1,
        userName: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',
        avatar: '',
        status: '',
        updateTime: ''
    })
    const [userNameWarn, setUserNameWarn] = useState<string>('');
    const [passwordWarn, setPasswordWarn] = useState<string>('');
    const [phoneWarn, setPhoneWarn] = useState<string>('');
    const [firstNameWarn, setFirstNameWarn] = useState<string>('');
    const [lastNameWarn, setLastNameWarn] = useState<string>('');
    const [myRes, setMyRes] = useState<MyResponse<AccountField> | undefined>(undefined);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = e.target.value;
        checkString(value, field);
        switch(field) { 
            case 'userName': { 
                setAccount({...account, userName: value})
                break; 
            } 
            case 'password': { 
                setAccount({...account, password: value})
                break; 
            } 
            case 'phone': { 
                setAccount({...account, phone: value})
                break; 
            } 
            case 'firstName': { 
                setAccount({...account, firstName: value})
                break; 
            } 
            case 'lastName': { 
                setAccount({...account, lastName: value})
                break; 
            } 
            default: { 
                //statements; 
                break; 
            } 
        } 
    }

    const handleSignup = () => {
       signin()
    }

    const signin = async () => {
        const response = await axiosInstance.post<MyResponse<AccountField>>(
            `/api/service_account/mutate/signup`, 
            account
        );

        console.log(response?.data)

        setMyRes(response?.data)
    }

    const checkString = (str: string, field: string) => {
        switch (field) {
            case 'userName': {
                if (isSpace(str)) {
                    setUserNameWarn('Không được có khoảng trắng !');
                } else if (isFirstNumber(str)) {
                    setUserNameWarn('Ký tự đầu tiên không được là số !');
                } else if (containsSpecialCharacters(str)) {
                    setUserNameWarn('Tên tài khoản không được chứa ký tự đặc biệt !');
                } else {
                    setUserNameWarn('');
                }
                break;
            }
            case 'passward': {
                if (isSpace(str)) {
                    setPasswordWarn('Không được có khoảng trắng !');
                } else if (containsSpecialCharacters(str)) {
                    setPasswordWarn('Mật khẩu không được chứa ký tự đặc biệt !');
                } else {
                    setPasswordWarn('');
                }
                break;
            }
            case 'phone': {
                if (isSpace(str)) {
                    setPhoneWarn('Không được có khoảng trắng !');
                } else if (containsSpecialCharacters(str)) {
                    setPhoneWarn('Số điện thoại không được chứa ký tự đặc biệt !');
                } else if (!isValidPhoneNumber(str)) {
                    setPhoneWarn('Không phải là số điện thoại !');
                } else {
                    setPhoneWarn('');
                }
                break;
            }
            case 'firstName': {
                if (containsSpecialCharacters(str)) {
                    setFirstNameWarn('Tên không được chứa ký tự đặc biệt !');
                } else {
                    setFirstNameWarn('');
                }
                break;
            }
            case 'lastName  ': {
                if (containsSpecialCharacters(str)) {
                    setLastNameWarn('Tên không được chứa ký tự đặc biệt !');
                } else {
                    setLastNameWarn('');
                }
                break;
            }
            default: {
                break;
            }
        }
    };

    const goToSignin = () => {
        navigate('/signin');
    }

    return (
        <div className={style.parent}>
            <div className={style.main}>
                <div className={style.main1}>
                    <h2>Đăng ký</h2>
                    <div>
                        <div>Tài khoản</div>
                        <div>
                            <input 
                                type="text"
                                maxLength={100}
                                value={account.userName} 
                                onChange={(e) => handleChange(e, 'userName')} 
                            />
                            {userNameWarn.length > 0 && <p>{userNameWarn}</p>}
                        </div>
                    </div>
                    <div>
                        <div>Mật khẩu</div>
                        <div>
                            <input 
                                type="password"
                                maxLength={100}
                                value={account.password} 
                                onChange={(e) => handleChange(e, 'password')} 
                            />
                            {passwordWarn.length > 0 && <p>{passwordWarn}</p>}
                        </div>
                    </div>
                    <div>
                        <div>Số điện thoại</div>
                        <div>
                            <input 
                                type="text"
                                maxLength={15}
                                value={account.phone} 
                                onChange={(e) => handleChange(e, 'phone')} 
                            />
                            {phoneWarn.length > 0 && <p>{phoneWarn}</p>}
                        </div>
                    </div>
                    <div>
                        <div>Họ</div>
                        <div>
                            <input 
                                type="text"
                                maxLength={20}
                                value={account.firstName} 
                                onChange={(e) => handleChange(e, 'firstName')} 
                            />
                            {firstNameWarn.length > 0 && <p>{firstNameWarn}</p>}
                        </div>
                    </div>
                    <div>
                        <div>Tên</div>
                        <div>
                            <input 
                                type="text"
                                maxLength={20}
                                value={account.lastName} 
                                onChange={(e) => handleChange(e, 'lastName')}
                            />
                            {lastNameWarn.length > 0 && <p>{lastNameWarn}</p>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <button onClick={() => handleSignup()}>Đăng ký</button>   
                        </div>
                        <div onClick={() => goToSignin()}>Đăng nhập</div>
                        {<div style={{ color: myRes?.isSuccess ? 'blue' : 'red' }}>{myRes?.message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
