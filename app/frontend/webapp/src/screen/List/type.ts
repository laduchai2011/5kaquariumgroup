import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import { FishCodeField } from '@src/dataStruct/fishCode';

export interface FishCodeContextInterface {
    fishCodes: FishCodeField[] | undefined,
    totalCount: number | undefined,
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>
}