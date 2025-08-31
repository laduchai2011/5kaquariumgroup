import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FISHCODE_API } from '@src/const/api/fishCode';
import type { MyResponse } from '@src/dataStruct/response';
import type { PagedFishCodeField, FishCodeField } from '@src/dataStruct/fishCode';

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
        getFishCodes: builder.query<PagedFishCodeField, { page: string; size: string }>({
            query: ({ page, size }) => `${FISHCODE_API.GET_FISHCODES}?page=${page}&size=${size}`,
            transformResponse: (response: { isSuccess: boolean; data: PagedFishCodeField }) => {
                if (!response.data) throw new Error('No data');
                return response.data;
            },
            // providesTags: (result) =>
            //     result?.items
            //         ? [
            //             // Tạo tag cho từng phần tử trong trang
            //             ...result.items.map(({ id }) => ({ type: 'FishCode' as const, id })),
            //             // Tag đặc biệt cho danh sách (LIST)
            //             { type: 'FishCode', id: 'LIST' },
            //         ]
            //         : [{ type: 'FishCode', id: 'LIST' }],
        }),
        addFishCode: builder.mutation<MyResponse<FishCodeField>, FishCodeField>({
            query: (body) => ({
                url: FISHCODE_API.ADD_FISHCODE,
                method: 'POST',
                body,
            })
        }),
        // getContacts: builder.query<ContactField[], void>({
        //     query: () => ACCOUNT_API.GET_CONTACTS,
        //     transformResponse: (response: MyResponse<ContactField[]>) => response.data ?? [],
        //     providesTags: (result) =>
        //         result
        //             ? [
        //                 ...result
        //                 .map(({ id }) => ({ type: 'Contact' as const, id: id! })),
        //                 { type: 'Contact', id: 'LIST' },
        //             ]
        //             : [{ type: 'Contact', id: 'LIST' }],
        // }),
        // getStatistic: builder.query<MyResponse<StatisticField>, void>({
        //     query: () => ACCOUNT_API.GET_STATISTIC,
        //     // transformResponse: (response: MyResponse<StatisticField>): StatisticField => {
        //     //     if (!response.data) throw new Error('No account data');
        //     //     response.
        //     //     return response.data;
        //     // },
        //     providesTags: (result) =>
        //         result?.data
        //             ? [
        //                 { type: 'Statistic', id: result.data.id },
        //                 { type: 'Statistic', id: 'LIST' },
        //             ]
        //             : [{ type: 'Statistic', id: 'LIST' }],
        // }),

        // //////////////////////////////////////////////////////////////////////////
        // changeAvatar: builder.mutation<MyResponse<AccountField>, AccountField>({
        //     query: (body) => ({
        //         url: ACCOUNT_API.CHANGE_AVATAR,
        //         method: 'PATCH',
        //         body,
        //     }),
        //     invalidatesTags: (result) => 
        //         result?.data
        //             ? [{ type: 'Account', id: result.data.id }]
        //             : [{ type: 'Account', id: 'LIST' }],
        // }),
        // changeName: builder.mutation<MyResponse<AccountField>, AccountField>({
        //     query: (body) => ({
        //         url: ACCOUNT_API.CHANGE_NAME,
        //         method: 'PATCH',
        //         body,
        //     }),
        //     invalidatesTags: (result) => 
        //         result?.data
        //             ? [{ type: 'Account', id: result.data.id }]
        //             : [{ type: 'Account', id: 'LIST' }],
        // }),
        // addContact: builder.mutation<MyResponse<ContactField>, ContactField>({
        //     query: (body) => ({
        //         url: ACCOUNT_API.ADD_CONTACT,
        //         method: 'POST',
        //         body,
        //     }),
        //     async onQueryStarted(_newContact, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled;
        //             if (data?.data) {
        //                 // Cập nhật cache cho getContacts (không cần refetch)
        //                 dispatch(
        //                     fishCodeRTK.util.updateQueryData('getContacts', undefined, (draft) => {
        //                         if (data?.data) {
        //                             draft.push(data.data);
        //                         }
        //                     })
        //                 );
        //             }
        //         } catch (err) {
        //             console.error('addContact failed', err);
        //         }
        //     }
        // }),
        // createStatistic: builder.mutation<MyResponse<StatisticField>, void>({
        //     query: () => ({
        //         url: ACCOUNT_API.CREATE_STATISTIC,
        //         method: 'POST',
        //     }),
        //     invalidatesTags: (result) => 
        //         result?.data
        //             ? [{ type: 'Statistic', id: result.data.id }]
        //             : [{ type: 'Statistic', id: 'LIST' }],
        // }),
    }),
});

export const { 
    useGetAFishCodeWithIdQuery,
    useGetFishCodesQuery,
    useAddFishCodeMutation
} = fishCodeRTK;
