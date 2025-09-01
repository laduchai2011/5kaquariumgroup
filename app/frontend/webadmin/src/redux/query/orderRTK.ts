import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ORDER_API } from '@src/const/api/order';
// import type { MyResponse } from '@src/dataStruct/response';
import type { PagedOrderField, OrderFilterField } from '@src/dataStruct/order';




export const orderRTK = createApi({
    reducerPath: 'orderRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        // getMyOrders: builder.query<PagedOrderField, { page: string; size: string }>({
        //     query: ({ page, size }) => `${ORDER_API.GET_MY_ORDERS}?page=${page}&size=${size}`,
        //     transformResponse: (response: { isSuccess: boolean; data: PagedOrderField }) => {
        //         if (!response.data) throw new Error('No data');
        //         return response.data;
        //     },
        // }),
        // addOrderWithTransaction: builder.mutation<MyResponse<OrderField>, AddOrderBody>({
        //     query: (body) => ({
        //         url: ORDER_API.ADD_ORDER_WITH_TRANSACTION,
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        getOrdersWithFilter: builder.mutation<PagedOrderField, OrderFilterField>({
            query: (body) => ({
                url: ORDER_API.GET_ORDERS_WITH_FILTER,
                method: 'POST',
                body
            })
        }),
    }),
});

export const { 
    useGetOrdersWithFilterMutation
} = orderRTK;
