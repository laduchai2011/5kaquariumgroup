import { BASE_URL } from "./baseUrl";

export const ORDER_API = {
    GET_MY_ORDERS: `${BASE_URL}/api/service_order/query/getMyOrders`,
    // ADD_ORDER_WITH_TRANSACTION: `${BASE_URL}/api/service_order/mutate/addOrderWithTransaction`,
    BUY_NOW: `${BASE_URL}/api/service_order/mutate/webappSreenProductBuyNow`,
    CREATE_SHOPPING_CART: `${BASE_URL}/api/service_order/mutate/webappSreenProductCreateShoppingCart`,
    EDIT_SHOPPING_CART: `${BASE_URL}/api/service_order/mutate/webappSreenProductEditShoppingCart`,
    GET_SHOPPING_CART: `${BASE_URL}/api/service_order/query/webappSreenProductGetShoppingCarts`,
}