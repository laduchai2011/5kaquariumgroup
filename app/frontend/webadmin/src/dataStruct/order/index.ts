export interface OrderField {
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
    userId: number;
    productId: number;
    sellerId: number;
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

export type AddOrderBody = {
    order: OrderField, 
    paymentMethod: OrderPaymentMethodField
}

export interface PagedOrderField {
    items: OrderField[],
    totalCount: number
}

export interface OrderFilterField {
    page: number,
    size: number,
    orderProcess: OrderProcessField;
}