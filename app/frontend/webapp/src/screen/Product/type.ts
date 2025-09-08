import { ProductField } from '@src/dataStruct/product';
import { OrderProductField, OrderContactField, OrderField } from '@src/dataStruct/order';


export interface ProductContextInterface {
    product: ProductField | undefined,
    setProduct: React.Dispatch<React.SetStateAction<ProductField | undefined>>,
    orderProduct: OrderProductField,
    setOrderProduct: React.Dispatch<React.SetStateAction<OrderProductField>>,
    contact: OrderContactField | undefined,
    selectedShoppingCart: OrderField | undefined,
    setSelectedShoppingCart: React.Dispatch<React.SetStateAction<OrderField | undefined>>,
}