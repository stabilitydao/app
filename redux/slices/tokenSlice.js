import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    symbol: false,
    name: false,
    totalSupply: false,
    decimals: false,
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        symbol: (state, action) => {
            state.symbol = action.payload
        },
        name: (state, action) => {
            state.name = action.payload
        },
        totalSupply: (state, action) => {
            state.totalSupply = action.payload
        },
    },
})

export const { symbol, name, totalSupply } = tokenSlice.actions
export default tokenSlice.reducer