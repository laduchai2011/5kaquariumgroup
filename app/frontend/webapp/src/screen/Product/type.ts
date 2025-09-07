import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import { ProductField } from '@src/dataStruct/product';
import { OrderProductField, OrderContactField } from '@src/dataStruct/order';


export interface ProductContextInterface {
    product: ProductField | undefined,
    setProduct: React.Dispatch<React.SetStateAction<ProductField | undefined>>,
    orderProduct: OrderProductField,
    setOrderProduct: React.Dispatch<React.SetStateAction<OrderProductField>>,
    contact: OrderContactField | undefined,
    shoppingCartEdit: ShoppingCartEditInterface,
    setShoppingCartEdit: React.Dispatch<React.SetStateAction<ShoppingCartEditInterface>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>
}

export interface ShoppingCartEditInterface {
    isShow: boolean
}