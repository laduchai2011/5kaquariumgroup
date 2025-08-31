import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { accountOption } from '@src/dataStruct';
import { ACCOUNT_API } from '@src/const/api/account';
import { router_res_type } from '@src/interface';

export const accountRTK = createApi({
    reducerPath: 'accountRTK',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        // Mutation (POST)
        signup: builder.mutation<router_res_type, accountOption>({
            query: (body) => ({
                url: ACCOUNT_API.SIGNUP,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),

        // // Query (GET)
        // getUsers: builder.query<User[], void>({
        //     query: () => 'users',
        //     providesTags: ['User'],
        // }),
    }),
});

export const { useSignupMutation } = accountRTK;
