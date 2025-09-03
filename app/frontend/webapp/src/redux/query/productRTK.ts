import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PRODUCT_API } from '@src/const/api/product';
import { MyResponse } from '@src/dataStruct/response';
import { ProductField, PagedProductField } from '@src/dataStruct/product';

export const productRTK = createApi({
    reducerPath: 'productRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAProductWithId: builder.query<ProductField, {id: string}>({
            query: ({id}) => `${PRODUCT_API.GET_APRODUCT_WITH_ID}?id=${id}`,
            transformResponse: (response: MyResponse<ProductField>): ProductField => {
                if (!response.data) {
                    throw new Error('No account data (getAProductWithId)')
                };
                return response.data;
            }
        }),
        getProducts: builder.query<PagedProductField, { page: string; size: string, fishCodeId: string }>({
            query: ({ page, size, fishCodeId }) => `${PRODUCT_API.GET_APRODUCTS}?page=${page}&size=${size}&fishCodeId=${fishCodeId}`,
            transformResponse: (response: { isSuccess: boolean; data: PagedProductField }) => {
                if (!response.data) throw new Error('No data');
                return response.data;
            },
            
        }),
    }),
});

export const { 
   useGetAProductWithIdQuery,
   useGetProductsQuery
} = productRTK;
