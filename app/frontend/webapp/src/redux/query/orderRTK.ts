import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ORDER_API } from '@src/const/api/order';
import { MyResponse } from '@src/dataStruct/response';
import { OrderField, OrderProductField, PagedOrderField, BuyNowBodyType, GetMyOrderBodyType } from '@src/dataStruct/order';




export const orderRTK = createApi({
    reducerPath: 'orderRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getMyOrders: builder.query<MyResponse<PagedOrderField>, GetMyOrderBodyType>({
            query: (body) => ({
                url: ORDER_API.GET_MY_ORDERS,
                method: 'POST',
                body
            })
        }),
        getShoppingCarts: builder.query<MyResponse<PagedOrderField>, { page: string; size: string }>({
            query: ({ page, size }) => `${ORDER_API.GET_SHOPPING_CART}?page=${page}&size=${size}`,
            providesTags: (result) => 
                result?.isSuccess && result?.data
                    ? [
                        ...result.data.items.map((data) => ({ type: 'Order' as const, id: data.id })), 
                        { type: 'Order', id: 'LIST' }
                    ]
                    : [{ type: 'Order', id: 'LIST' }],
        }), 
        getMyAllOrderProductsInOrder: builder.query<MyResponse<OrderProductField>, {orderId: string}>({
            query: ({orderId}) => `${ORDER_API.GET_MY_ALL_ORDER_PRODUCTS_IN_ORDER}?orderId=${orderId}`,
        }),
        // addOrderWithTransaction: builder.mutation<MyResponse<OrderField>, AddOrderBody>({
        //     query: (body) => ({
        //         url: ORDER_API.ADD_ORDER_WITH_TRANSACTION,
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        buyNow: builder.mutation<MyResponse<OrderField>, BuyNowBodyType>({
            query: (body) => ({
                url: ORDER_API.BUY_NOW,
                method: 'POST',
                body,
            }),
        }),
        createShoppingCart: builder.mutation<MyResponse<OrderField>, OrderField>({
            query: (body) => ({
                url: ORDER_API.CREATE_SHOPPING_CART,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) =>
                result?.isSuccess && result?.data
                    ? [
                        { type: 'Order', id: result.data.id },
                        { type: 'Order', id: 'LIST' }
                    ]
                    : [{ type: 'Order', id: 'LIST' }],
        }),
        editShoppingCart: builder.mutation<MyResponse<OrderField>, OrderField>({
            query: (body) => ({
                url: ORDER_API.EDIT_SHOPPING_CART,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result) =>
                result?.isSuccess && result?.data
                    ? [
                        { type: 'Order', id: result.data.id },
                        { type: 'Order', id: 'LIST' }
                    ]
                    : [{ type: 'Order', id: 'LIST' }],
        }),
        addProductToShoppingCart: builder.mutation<MyResponse<OrderProductField>, OrderProductField>({
            query: (body) => ({
                url: ORDER_API.ADD_PRODUCT_TO_SHOPPING_CART,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { 
    useGetMyOrdersQuery,
    useGetShoppingCartsQuery,
    useGetMyAllOrderProductsInOrderQuery,
    // useAddOrderWithTransactionMutation,
    useBuyNowMutation,
    useCreateShoppingCartMutation,
    useEditShoppingCartMutation,
    useAddProductToShoppingCartMutation
} = orderRTK;
