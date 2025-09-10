import { OrderField } from '@src/dataStruct/order';

export interface MyOrderContextInterface {
    orders: OrderField[] | undefined,
    totalCount: number | undefined,
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>,
}