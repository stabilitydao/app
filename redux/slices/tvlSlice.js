import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const tvlSlice = createSlice({
    name: 'tvl',
    initialState,
    reducers: {
        updateTVL: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateTVL } = tvlSlice.actions
export default tvlSlice.reducer