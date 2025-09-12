import { BASE_URL } from "./baseUrl";

export const ORDER_API = {
    GET_MY_ORDERS: `${BASE_URL}/api/service_order/query/webappSreenMyOrderGetMyOrders`,
    GET_MY_ALL_ORDER_PRODUCTS_IN_ORDER: `${BASE_URL}/api/service_order/query/webappSreenMyOrderGetMyALLOrderProductsInOrder`,
    GET_MY_ORDER_PROCESS_IN_ORDER: `${BASE_URL}/api/service_order/query/webappSreenMyOrderGetMyOrderProcessInOrder`,
    // ADD_ORDER_WITH_TRANSACTION: `${BASE_URL}/api/service_order/mutate/addOrderWithTransaction`,
    BUY_NOW: `${BASE_URL}/api/service_order/mutate/webappSreenProductBuyNow`,
    CREATE_SHOPPING_CART: `${BASE_URL}/api/service_order/mutate/webappSreenProductCreateShoppingCart`,
    EDIT_SHOPPING_CART: `${BASE_URL}/api/service_order/mutate/webappSreenProductEditShoppingCart`,
    ADD_PRODUCT_TO_SHOPPING_CART: `${BASE_URL}/api/service_order/mutate/webappSreenProductAddProductToShoppingCart`,
    GET_SHOPPING_CART: `${BASE_URL}/api/service_order/query/webappSreenProductGetShoppingCarts`,
}