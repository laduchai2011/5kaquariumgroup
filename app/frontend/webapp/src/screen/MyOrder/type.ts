import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import { OrderField } from '@src/dataStruct/order';

export interface MyOrderContextInterface {
    orders: OrderField[] | undefined,
    totalCount: number | undefined,
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>
}