import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api_url: any = process.env.NEXT_PUBLIC_API_URL;
const apiCategory = createApi({
    reducerPath: "category",
    tagTypes: ["Category"],
    baseQuery: fetchBaseQuery({
        baseUrl: api_url,
        fetchFn: async (...args) => {
            // await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getProductInCategory: builder.query({
            query: (token: any) => ({
                url: `/getproductincategory`,
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            }),
            providesTags: ["Category"],

        }),
        getToppingInProductInCategory: builder.query({
            query: (id: any) => ({
                url: `/product/${id}`,
            }),
            providesTags: ["Category"],
        }),

        updateToppingInProduct: builder.mutation({
            query: ({ id, product }: any) => ({
                url: `product/${id}/update`,
                method: "PUT",
                body: product,
            }),
            invalidatesTags: ["Category"],
        }),
        getOneProduct: builder.query({
            query: (id: any) => `/products/${id}/`,
            providesTags: ["Category"],
        }),
        getAllCategory: builder.query({
            query: (id: any) => `/category/`,
            providesTags: ["Category"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `products/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `category/`,
                method: "POST",
                headers: { "Authorization": `Bearer ${data?.token}` },
                body: data?.data,
            }),
            invalidatesTags: ["Category"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
        removeCategory: builder.mutation({
            query: (id) => ({
                url: `category/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});
export const {
    useGetProductInCategoryQuery,
    useGetToppingInProductInCategoryQuery,
    useUpdateToppingInProductMutation,
    useGetOneProductQuery,
    useGetAllCategoryQuery,
    useCreateProductMutation,
    useCreateCategoryMutation,
    useDeleteProductMutation,
    useRemoveCategoryMutation,
} = apiCategory;
export const productReducer = apiCategory.reducer;
export default apiCategory;