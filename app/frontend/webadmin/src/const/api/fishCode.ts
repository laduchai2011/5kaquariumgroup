import { BASE_URL } from "./baseUrl";

export const FISHCODE_API = {
    GET_AFISHCODE_WITH_ID: `${BASE_URL}/api/service_fishCode/query/getAFishCodeWithId`,
    GET_FISHCODES: `${BASE_URL}/api/service_fishCode/query/fishcodes`,
    ADD_FISHCODE: `${BASE_URL}/api/service_fishCode/mutate/addFishCode`,
}