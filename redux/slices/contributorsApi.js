import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contributorsApi = createApi({
    reducerPath: 'contributorsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/users/' }),
    endpoints: (builder) => ({
        getContributors: builder.query({
            query: (userName) => `${userName}`,
        }),
    }),
})


export const { useGetContributorsQuery } = contributorsApi