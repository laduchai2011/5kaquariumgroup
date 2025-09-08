import type { MessageDataInterface } from '@src/component/MessageDialog/type';
import { ProductField } from '@src/dataStruct/product';
import { OrderProductField, OrderContactField, OrderField } from '@src/dataStruct/order';


export interface ProductContextInterface {
    product: ProductField | undefined,
    setProduct: React.Dispatch<React.SetStateAction<ProductField | undefined>>,
    orderProduct: OrderProductField,
    setOrderProduct: React.Dispatch<React.SetStateAction<OrderProductField>>,
    contact: OrderContactField | undefined,
    shoppingCartEdit: ShoppingCartEditInterface,
    setShoppingCartEdit: React.Dispatch<React.SetStateAction<ShoppingCartEditInterface>>
    selectedShoppingCart: OrderField | undefined,
    setSelectedShoppingCart: React.Dispatch<React.SetStateAction<OrderField | undefined>>,
    setIsShoppingCartCreate: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<MessageDataInterface>>
}

export interface ShoppingCartEditInterface {
    isShow: boolean,
    shoppingCart: OrderField | undefined
}