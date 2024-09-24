import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api_url: any = process.env.NEXT_PUBLIC_API_URL;

const apiRestaurant: any = createApi({
    reducerPath: "restaurant",
    tagTypes: ["Restaurant"],
    baseQuery: fetchBaseQuery({
        baseUrl: api_url,
        fetchFn: async (...args) => {
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        checkRestaurant: builder.query({
            query: (id: any) => `/restaurant/checkRestaurant/${id}`,
            providesTags: ["Restaurant"],
        }),
        restaurantType: builder.query({
            query: () => `/restaurantType/getAllRestaurantType`,
            providesTags: ["Restaurant"],
        }),
        createRestaurant: builder.mutation({
            query: (data) => ({
                url: `/restaurant/createRestaurant`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }),
            invalidatesTags: ["Restaurant"],
        }),
        getRestaurantUser: builder.query({
            query: (token: any) => ({
                url: `/restaurant/getrestaurantuser`,
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            }),
            providesTags: ["Restaurant"],

        }),

    }),
});
export const {
    useCheckRestaurantQuery,
    useRestaurantTypeQuery,
    useCreateRestaurantMutation,
    useGetRestaurantUserQuery
} = apiRestaurant;
export const authReducer = apiRestaurant.reducer;
export default apiRestaurant;