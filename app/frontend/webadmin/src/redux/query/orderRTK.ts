import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ORDER_API } from '@src/const/api/order';
import type { MyResponse } from '@src/dataStruct/response';
import type { PagedOrderField, AdminOrderBodyType, OrderProductField } from '@src/dataStruct/order';




export const orderRTK = createApi({
    reducerPath: 'orderRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        // getOrdersWithFilter: builder.query<MyResponse<PagedOrderField>, OrderFilterField>({
        //     query: (body) => ({
        //         url: ORDER_API.GET_ORDERS_WITH_FILTER,
        //         method: 'POST',
        //         body
        //     })
        // }),
        getOrders: builder.query<MyResponse<PagedOrderField>, AdminOrderBodyType>({
            query: (body) => ({
                url: ORDER_API.GET_ORDERS,
                method: 'POST',
                body
            })
        }),
        getAllOrderProductsInOrder: builder.query<MyResponse<OrderProductField[]>, {orderId: string}>({
            query: ({orderId}) => `${ORDER_API.GET_ALL_ORDER_PRODUCTS_IN_ORDER}?orderId=${orderId}`,
        }),
    }),
});

export const { 
    // useGetOrdersWithFilterQuery,
    useGetOrdersQuery,
    useGetAllOrderProductsInOrderQuery
} = orderRTK;
