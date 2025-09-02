import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ACCOUNT_API } from '@src/const/api/account';
import type { MyResponse } from '@src/dataStruct/response';
import type { AccountField } from '@src/dataStruct/account';

export const accountRTK = createApi({
    reducerPath: 'accountRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['Account', 'Contact', 'Statistic'],
    endpoints: (builder) => ({
        getAccountWithId: builder.query<AccountField, {id: string}>({
            query: ({id}) => `${ACCOUNT_API.GET_ACCOUNT_WITH_ID}?id=${id}`,
            transformResponse: (response: MyResponse<AccountField>): AccountField => {
                if (!response.data) throw new Error('No account data');
                return response.data;
            }
        }),
       
    }),
});

export const { 
    useGetAccountWithIdQuery,
} = accountRTK;
