import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    in: false,
}

export const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        updateProfitPrice: (state, action) => {
            state.value = action.payload[0]
            state.in = action.payload[1]
        },
    },
})

export const { updateProfitPrice } = priceSlice.actions
export default priceSlice.reducer