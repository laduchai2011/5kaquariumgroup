const BASE_URL = process.env.API_URL || 'http://172.19.224.1:3006';

export const ORDER_API = {
    GET_MY_ORDERS: `${BASE_URL}/api/service_order/query/getMyOrders`,
    ADD_ORDER_WITH_TRANSACTION: `${BASE_URL}/api/service_order/mutate/addOrderWithTransaction`,
}