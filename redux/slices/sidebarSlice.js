import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        updateSidebar: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { updateSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer