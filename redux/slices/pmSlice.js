import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalSupply: false,
    mintStart: 0,
    mintEnd: 0,
    toMint: 0,
}

export const pmSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        pmtotalSupply: (state, action) => {
            state.totalSupply = action.payload
        },
        mintStart: (state, action) => {
            state.mintStart = action.payload
        },
        mintEnd: (state, action) => {
            state.mintEnd = action.payload
        },
        toMint: (state, action) => {
            state.toMint = action.payload
        },
    },
})

export const { pmtotalSupply, mintStart, mintEnd, toMint } = pmSlice.actions
export default pmSlice.reducer