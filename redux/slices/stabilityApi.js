import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const stabilityApi = createApi({
    reducerPath: 'stabilityApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/orgs/stabilitydao/' }),
    endpoints: (builder) => ({
        getContributorsList: builder.query({
            query: (data) => `${data}`,
        }),
    }),
})


export const { useGetContributorsListQuery } = stabilityApi