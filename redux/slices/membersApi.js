import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const membersApi = createApi({
    reducerPath: 'membersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/users/' }),
    endpoints: (builder) => ({
        getMembers: builder.query({
            query: (userName) => `${userName}`,
        }),
    }),
})


export const { useGetMembersQuery } = membersApi