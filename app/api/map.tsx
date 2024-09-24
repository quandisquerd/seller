import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = 'https://vapi.vnappmob.com/api/province/';
const countryApi = createApi({
    reducerPath: 'province',
    tagTypes: ['Province'],
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        fetchFn: async (...args) => {
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAllProvince: builder.query({
            query: () => ({
                url: baseUrl,
            }),
            providesTags: ['Province'],
        }),
        getAllDistrict: builder.query({
            query: (id) => ({
                url: `${baseUrl}district/${id}`
            }),
            providesTags: ['Province'],
        }),
        getAllWard: builder.query({
            query: (id) => ({
                url: `${baseUrl}ward/${id}`
            }),
            providesTags: ['Province'],
        })
    })
})
export const { useGetAllProvinceQuery, useGetAllDistrictQuery, useGetAllWardQuery } = countryApi
export default countryApi