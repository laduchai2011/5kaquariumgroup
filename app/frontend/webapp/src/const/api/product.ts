const BASE_URL = process.env.API_URL || 'http://172.19.224.1:3006';

export const PRODUCT_API = {
    GET_APRODUCT_WITH_ID: `${BASE_URL}/api/service_product/query/getAProductWithId`,
    GET_APRODUCTS: `${BASE_URL}/api/service_product/query/getProducts`,
}