import { BASE_URL } from "./baseUrl";

export const ACCOUNT_API = {
    SIGNUP: `${BASE_URL}/api/service_account/mutate/signup`,
    GET_CONTACTS: `${BASE_URL}/api/service_account/query/contacts`,
    GET_ACCOUNT: `${BASE_URL}/api/service_account/query/account`,
    GET_ACCOUNT_WITH_ID: `${BASE_URL}/api/service_account/query/getAccountWithId`,
    GET_STATISTIC: `${BASE_URL}/api/service_account/query/statistic`,
    CHANGE_AVATAR: `${BASE_URL}/api/service_account/mutate/changeAvatar`,
    CHANGE_NAME: `${BASE_URL}/api/service_account/mutate/changeName`,
    ADD_CONTACT: `${BASE_URL}/api/service_account/mutate/addContact`,
    CREATE_STATISTIC: `${BASE_URL}/api/service_account/mutate/createStatistic`,
};


export const IMAGE_API = {
    GET_IMAGE: `${BASE_URL}/api/service_image/query/image`,
    UPLOAD_AIMAGE: `${BASE_URL}/api/service_image/mutate/uploadAImage`,
}