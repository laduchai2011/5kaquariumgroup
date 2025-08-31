import { useState } from 'react';
import style from './style.module.scss';
import HeaderLeft from '@src/component/Header/HeaderLeft';
import HeaderTop from '@src/component/Header/HeaderTop';
import Avatar from './Avatar';
import OverView from './OverView';
import Contact from './Contact';
import AddContact from './AddContact';
import MainLoading from '@src/component/MainLoading';
import MessageDialog from '@src/component/MessageDialog';
import ChangeAvatar from './ChangeAvatar';
import ChangeName from './ChangeName';
import { PROFILE } from '@src/const/text';
import { ProfileContext } from './context';
import { ProfileContextInterface } from './type';
import { useNavigate } from 'react-router-dom';
import { MessageDataInterface } from '@src/component/MessageDialog/type';

const Profile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isShow_ChangeAvatar, set_isShow_ChangeAvatar] = useState<boolean>(false);
    const [isShow_ChangeName, set_isShow_ChangeName] = useState<boolean>(false);
    const [isShow_AddContact, set_isShow_AddContact] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageDataInterface>({
        message: '',
        type: 'normal'
    })

    const handleCloseMessage = () => {
        setMessage({...message, message: ''})
    }
    
    const valueContext: ProfileContextInterface = {
        isShow_ChangeAvatar,
        isShow_ChangeName,
        isShow_AddContact,
        set_isShow_ChangeAvatar,
        set_isShow_ChangeName,
        set_isShow_AddContact,
        setIsLoading,
        setMessage
    }

    const myId = sessionStorage.getItem("myId");

    if (myId !== null) {
        return (
            <ProfileContext.Provider value={valueContext}>
                <div className={style.parent}>
                    {isLoading && <MainLoading />}
                    {message.message.length > 0 && <MessageDialog message={message.message} type={message.type} onClose={() => handleCloseMessage()} />}
                    <ChangeAvatar />
                    <ChangeName />
                    <AddContact />
                    <div className={style.headerLeft}><HeaderLeft header={PROFILE} /></div>
                    <div className={style.headerTop}><HeaderTop header={PROFILE} /></div>
                    <div className={style.main}>
                        <div className={style.main1}>
                            <Avatar />
                            <OverView />
                            <Contact />
                        </div>
                    </div>
                </div>
            </ProfileContext.Provider>
        )
    }

    return (
        <div className={style.parent1}>
            <div> 
                <div>Bạn chưa đăng nhập</div>
                <button onClick={() => navigate('/signin')}>Đăng nhập</button>
            </div>
        </div>
    )
}

export default Profile;