import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 137,
}

export const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        updatenetwork: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updatenetwork } = networkSlice.actions
export default networkSlice.reducer