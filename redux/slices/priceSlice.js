import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
    in: null,
    ethPrice: null,
}

export const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        updateProfitPrice: (state, action) => {
            state.value = action.payload[0]
            state.in = action.payload[1]
        },
        updateEthPrice: (state, action) => {
            state.ethPrice = action.payload
        },
    },
})

export const { updateProfitPrice, updateEthPrice } = priceSlice.actions
export default priceSlice.reducer