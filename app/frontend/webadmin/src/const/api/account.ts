const BASE_URL = import.meta.env.VITE_API_URL || 'http://172.19.224.1:3006';

export const ACCOUNT_API = {
    SIGNUP: `${BASE_URL}/api/service_account/mutate/signup`,
    GET_CONTACTS: `${BASE_URL}/api/service_account/query/contacts`,
    GET_ACCOUNT: `${BASE_URL}/api/service_account/query/account`,
    GET_STATISTIC: `${BASE_URL}/api/service_account/query/statistic`,
    CHANGE_AVATAR: `${BASE_URL}/api/service_account/mutate/changeAvatar`,
    CHANGE_NAME: `${BASE_URL}/api/service_account/mutate/changeName`,
    ADD_CONTACT: `${BASE_URL}/api/service_account/mutate/addContact`,
    CREATE_STATISTIC: `${BASE_URL}/api/service_account/mutate/createStatistic`,
};