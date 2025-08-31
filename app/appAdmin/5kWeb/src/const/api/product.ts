const BASE_URL = import.meta.env.VITE_API_URL || 'http://172.19.224.1:3006';

export const PRODUCT_API = {
    // GET_APRODUCT_WITH_ID: `${BASE_URL}/api/service_product/query/getAProductWithId`,
    ADD_PRODUCT: `${BASE_URL}/api/service_product/mutate/addProduct`,
}