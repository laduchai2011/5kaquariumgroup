import { BASE_URL } from "./baseUrl";

export const ORDER_API = {
    // GET_ORDERS_WITH_FILTER: `${BASE_URL}/api/service_order/mutate/getOrdersWithFilter`,
    GET_ORDERS: `${BASE_URL}/api/service_order/query/webadminSreenOrderGetOrders`,
    GET_ALL_ORDER_PRODUCTS_IN_ORDER: `${BASE_URL}/api/service_order/query/webadminSreenOrderGetALLOrderProductsInOrder`,
}