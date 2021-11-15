import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        updateAddress: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateAddress } = addressSlice.actions
export default addressSlice.reducer