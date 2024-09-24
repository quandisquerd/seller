import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api_url: any = process.env.NEXT_PUBLIC_API_URL;

const apiAuth:any = createApi({
    reducerPath: "auth",
    tagTypes: ["Auth"],
    baseQuery: fetchBaseQuery({
        baseUrl: api_url,
        fetchFn: async (...args) => {
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        registerSerler: builder.mutation({
            query: (data) => ({
                url: `authserler/registerSerler`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
        verifyOtpSerler: builder.mutation({
            query: (data) => ({
                url: `authserler/verifyotpSerler`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
        setPassword: builder.mutation({
            query: (data) => ({
                url: `authserler/setPassword`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `authserler/loginSerler`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Auth"],
        }),
    }),
});
export const {
    useRegisterSerlerMutation,
    useVerifyOtpSerlerMutation,
    useSetPasswordMutation,
    useLoginMutation,
} = apiAuth;
export const authReducer = apiAuth.reducer;
export default apiAuth;