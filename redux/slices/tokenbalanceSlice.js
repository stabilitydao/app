import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const tokenbalanceSlice = createSlice({
    name: 'tokenBalance',
    initialState,
    reducers: {
        updateTokenbalance: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateTokenbalance } = tokenbalanceSlice.actions
export default tokenbalanceSlice.reducer