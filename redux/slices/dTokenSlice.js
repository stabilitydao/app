import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    symbol: false,
    name: false,
    totalSupply: false,
    decimals: false,
}

export const dTokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        dsymbol: (state, action) => {
            state.symbol = action.payload
        },
        dname: (state, action) => {
            state.name = action.payload
        },
        dtotalSupply: (state, action) => {
            state.totalSupply = action.payload
        },
    },
})

export const { dsymbol, dname, dtotalSupply } = dTokenSlice.actions
export default dTokenSlice.reducer