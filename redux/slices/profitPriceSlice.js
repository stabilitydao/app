import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const profitPriceSlice = createSlice({
    name: 'profitpriceIn$',
    initialState,
    reducers: {
        updateProfitPriceIn$: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateProfitPriceIn$ } = profitPriceSlice.actions
export default profitPriceSlice.reducer