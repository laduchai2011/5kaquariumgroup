import { MessageDataInterface } from '@src/component/MessageDialog/type';

export interface ProfileContextInterface {
    isShow_ChangeAvatar: boolean,
    isShow_ChangeName: boolean,
    isShow_AddContact: boolean,
    set_isShow_ChangeAvatar: React.Dispatch<React.SetStateAction<boolean>>,
    set_isShow_ChangeName: React.Dispatch<React.SetStateAction<boolean>>,
    set_isShow_AddContact: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>
}