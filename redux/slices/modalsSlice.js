import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        IsNetworkOption: false,
        IsProfile: false,
        IsModalOptionOpened: false,
    }
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        updateIsNetworkOption: (state, action) => {
            state.value.IsNetworkOption = action.payload
        },
        updateIsProfile: (state, action) => {
            state.value.IsProfile = action.payload
        },
        updateIsWalletOption: (state, action) => {
            state.value.IsModalOptionOpened = action.payload
        },
    },
})

export const { updateIsNetworkOption, updateIsProfile, updateIsWalletOption } = modalsSlice.actions
export default modalsSlice.reducer