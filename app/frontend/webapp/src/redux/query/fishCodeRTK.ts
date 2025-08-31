import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FISHCODE_API } from '@src/const/api/fishCode';
import type { MyResponse } from '@src/dataStruct/response';
import type { FishCodeField, PagedFishCodeField, FishCodeForFilterField } from '@src/dataStruct/fishCode';

export const fishCodeRTK = createApi({
    reducerPath: 'fishCodeRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['FishCode'],
    endpoints: (builder) => ({
        getAFishCodeWithId: builder.query<FishCodeField, {id: string}>({
            query: ({id}) => `${FISHCODE_API.GET_AFISHCODE_WITH_ID}?id=${id}`,
            transformResponse: (response: MyResponse<FishCodeField>): FishCodeField => {
                if (!response.data) throw new Error('No account data (getAFishCodeWithId)');
                return response.data;
            }
        }),
        getFishCodesAccordingtoName: builder.query<PagedFishCodeField, { page: string; size: string }>({
            query: ({ page, size }) => `${FISHCODE_API.GET_FISHCODES_ACCORDINGTO_NAME}?page=${page}&size=${size}`,
            transformResponse: (response: { isSuccess: boolean; data: PagedFishCodeField }) => {
                if (!response.data) throw new Error('No data');
                return response.data;
            },
        }),
        getAllFishCodesForFilter: builder.query<FishCodeForFilterField[], void>({
            query: () => FISHCODE_API.GET_ALLFISHCODES_FOR_FILTER,
            transformResponse: (response: { isSuccess: boolean; data: FishCodeForFilterField[] }) => {
                if (!response.data) throw new Error('No data');
                return response.data;
            },
        }),
    }),
});

export const { 
    useGetAFishCodeWithIdQuery,
    useGetFishCodesAccordingtoNameQuery,
    useGetAllFishCodesForFilterQuery
} = fishCodeRTK;
