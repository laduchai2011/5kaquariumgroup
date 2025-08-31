import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PRODUCT_API } from '@src/const/api/product';
import type { MyResponse } from '@src/dataStruct/response';
import type { ProductField } from '@src/dataStruct/product';

export const productRTK = createApi({
    reducerPath: 'productRTK',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '', 
        credentials: 'include' 
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        addProduct: builder.mutation<MyResponse<ProductField>, ProductField>({
            query: (body) => ({
                url: PRODUCT_API.ADD_PRODUCT,
                method: 'POST',
                body
            })
        }),
    }),
});

export const { 
    useAddProductMutation
} = productRTK;
