import { useContext, useState } from 'react';
import style from './style.module.scss';
import { IoClose } from "react-icons/io5";
import { ProfileContext } from '../context';
import { AccountField } from '@src/dataStruct/account';
import { useChangeNameMutation } from '@src/redux/query/accountRTK';


const ChangeName = () => {
    const profileContext = useContext(ProfileContext)

    if (!profileContext) {
        throw new Error("profileContext in ChangeName component cant undefined !");
    }

    const {
        isShow_ChangeName,
        set_isShow_ChangeName, 
        setIsLoading
    } = profileContext;

    const [changeName] = useChangeNameMutation();

    const [account, setAccount] = useState<AccountField>({
        id: -1,
        userName: '',
        password: '',
        phone: '',
        firstName: '',
        lastName: '',
        avatar: null,
        status: '',
        updateTime: ''
    })

    const closeDialogChangeName = () => {
        set_isShow_ChangeName(false)
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
        const value = e.target.value;

        switch(field) { 
            case 'firstName': { 
                setAccount({...account, firstName: value}) 
                break; 
            } 
            case 'lastName': { 
                setAccount({...account, lastName: value}) 
                break; 
            } 
            default: { 
                break; 
            } 
        } 
    }

    const handleChangeName = () => {
        setIsLoading(true);
        changeName(account)
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false))
    }

    if (isShow_ChangeName) {
        return (
            <div className={style.parent}>
                <div>
                    <div><IoClose onClick={() => closeDialogChangeName()} title='Đóng' size={25} /></div>
                    <div><h2>Thay đổi tên</h2></div>
                    <div>
                        <div>
                            <div>Họ</div>
                            <div><input value={account.firstName} onChange={(e) => changeInput(e, 'firstName')} /></div>
                        </div>
                        <div>
                            <div>Tên</div>
                            <div><input value={account.lastName} onChange={(e) => changeInput(e, 'lastName')} /></div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleChangeName()}>Thay đổi</button>
                    </div>
                </div>
            </div>
        )
    }

    return
}

export default ChangeName;