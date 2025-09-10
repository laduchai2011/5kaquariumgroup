export interface OrderField {
    id: number;
    label: string;
    total: string;
    note: string;
    status: string;
    userId: number;
    updateTime: string;
    createTime: string;
}

export interface OrderProductField {
    id: number;
    title: string;
    image: string;
    name: string;
    size: string;
    amount: string;
    discount: string;
    fishCodeInProduct: string;
    price: string;
    status: string;
    orderId: number;
    productId: number;
    sellerId: number | null;
    updateTime: string;
    createTime: string;
}


export interface PagedOrderField {
    items: OrderField[],
    totalCount: number
}

export interface OrderProcessField {
    id: number;
    isOrder: boolean;
    isConfirm: boolean;
    confirmUser: boolean;
    isSend: boolean;
    sendUser: boolean;
    isReceive: boolean;
    orderId: number;
    updateTime: string;
    createTime: string;
}

export interface OrderPaymentMethodField {
    id: number;
    method: string;
    infor: string;
    isPay: boolean;
    orderId: number;
    updateTime: string;
    createTime: string;
}

export interface OrderPaymentField {
    id: number;
    method: string;
    infor: string;
    isPay: boolean;
    orderId: number;
    updateTime: string;
    createTime: string;
}

export interface OrderContactField {
    id: number;
    name: string;
    phone: string;
    address: string;
    contactId: number;
    orderId: number;
    updateTime: string;
    createTime: string;
}

export type BuyNowBodyType = {
    order: OrderField, 
    product: OrderProductField,
    payment: OrderPaymentField,
    contact: OrderContactField
}

export type GetMyOrderBodyType = {
    page: number,
    size: number,
    order: OrderField, 
    process: OrderProcessField,
    isProcess: boolean
}

export type AddToNewCartBodyType = {
    order: OrderField, 
    product: OrderProductField,
    payment: OrderPaymentField,
    contact: OrderContactField
}

export type AddOrderBody = {
    order: OrderField, 
    paymentMethod: OrderPaymentMethodField,
    orderContact: OrderContactField
}

export interface PagedOrderField {
    items: OrderField[],
    totalCount: number
}

export interface OrderFilterField {
    page: number,
    size: number,
    sellerId: number,
    isOrderProcess: boolean,
    orderProcess: OrderProcessField;
}