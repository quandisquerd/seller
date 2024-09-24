import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api_url: any = process.env.NEXT_PUBLIC_API_URL;

const apiProduct = createApi({
    reducerPath: "product",
    tagTypes: ["Product"],
    baseQuery: fetchBaseQuery({
        baseUrl: api_url,
        fetchFn: async (...args) => {
            // await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => "/products",
            providesTags: ["Product"],
        }),
        updateViewProductInCategory: builder.mutation({
            query: ({ id, product }: any) => ({
                url: `/product/${id}/updateview/`,
                method: "PATCH",
                body: product,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});
export const {
    useGetAllProductQuery,
} = apiProduct;
export const productReducer = apiProduct.reducer;
export default apiProduct;