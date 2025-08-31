const BASE_URL = import.meta.env.VITE_API_URL || 'http://172.19.224.1:3006';

export const FISHCODE_API = {
    GET_AFISHCODE_WITH_ID: `${BASE_URL}/api/service_fishCode/query/getAFishCodeWithId`,
    GET_FISHCODES: `${BASE_URL}/api/service_fishCode/query/fishcodes`,
    ADD_FISHCODE: `${BASE_URL}/api/service_fishCode/mutate/addFishCode`,
}