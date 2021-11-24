import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const syncSlice = createSlice({
    name: 'sync',
    initialState,
    reducers: {
        updateSync: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateSync } = syncSlice.actions
export default syncSlice.reducer