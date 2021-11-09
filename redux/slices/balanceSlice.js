import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        updateBalance: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateBalance } = balanceSlice.actions
export default balanceSlice.reducer