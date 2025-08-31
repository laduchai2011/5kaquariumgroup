import type { MessageDataInterface } from '@src/component/MessageDialog/type';

export interface ProfileContextInterface {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>
}