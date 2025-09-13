import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import type { OrderField, AdminOrderBodyType } from '@src/dataStruct/order';

export interface OrderContextInterface {
    orders: OrderField[],
    totalCount: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>,
    // orderFilter: OrderFilterField,
    // setOrderFilter: React.Dispatch<React.SetStateAction<OrderFilterField>>,
    orderBody: AdminOrderBodyType,
    setOrderBody: React.Dispatch<React.SetStateAction<AdminOrderBodyType>>
    selectedOrder: OrderField | undefined,
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrderField | undefined>>
}