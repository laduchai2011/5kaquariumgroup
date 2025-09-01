import { BASE_URL } from "./baseUrl";

export const ORDER_API = {
    GET_MY_ORDERS: `${BASE_URL}/api/service_order/query/getMyOrders`,
    ADD_ORDER_WITH_TRANSACTION: `${BASE_URL}/api/service_order/mutate/addOrderWithTransaction`,
}