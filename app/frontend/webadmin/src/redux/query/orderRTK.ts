import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ORDER_API } from '@src/const/api/order';
import type { MyResponse } from '@src/dataStruct/response';
import type { PagedOrderField, OrderFilterField } from '@src/dataStruct/order';




export const orderRTK = createApi({
    reducerPath: 'orderRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrdersWithFilter: builder.mutation<MyResponse<PagedOrderField>, OrderFilterField>({
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
