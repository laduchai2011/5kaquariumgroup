import { BASE_URL } from "./baseUrl";

export const FISHCODE_API = {
    GET_AFISHCODE_WITH_ID: `${BASE_URL}/api/service_fishCode/query/getAFishCodeWithId`,
    GET_FISHCODES: `${BASE_URL}/api/service_fishCode/query/fishcodes`,
    GET_FISHCODES_ACCORDINGTO_NAME: `${BASE_URL}/api/service_fishCode/query/getFishcodesAccordingtoName`,
    GET_ALLFISHCODES_FOR_FILTER: `${BASE_URL}/api/service_fishCode/query/getAllFishCodesForFilter`,
    ADD_FISHCODE: `${BASE_URL}/api/service_fishCode/mutate/addFishCode`,
}