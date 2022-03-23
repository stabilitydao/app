import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        IsNetworkOption: false,
        IsProfile: false,
        IsModalOptionOpened: false,
        IsModalPending: false,
        IsWaitingForWalletTxConfirm: false,
        IsWaitingForChangeNetwork: false,
        IsTxSubmitted: false,
        IsDelegateProfitToken: false,
        IsDelegateMakerToken: false,
        txhash: '',
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
        updateIsPending: (state, action) => {
            state.value.IsModalPending = action.payload
        },
        updateIsWaitingForWalletTxConfirm: (state, action) => {
            state.value.IsWaitingForWalletTxConfirm = action.payload
        },
        updateIsWaitingForChangeNetwork: (state, action) => {
            state.value.IsWaitingForChangeNetwork = action.payload
        },
        updateDelegateProfitToken: (state, action) => {
            state.value.IsDelegateProfitToken = action.payload
        },
        updateDelegateMakerToken: (state, action) => {
            state.value.IsDelegateProfitToken = action.payload
        },
        updateIsTxSubmitted: (state, action) => {
            state.value.txhash = action.payload
            state.value.IsTxSubmitted = true
        },
        txConfirmedByNetwork: (state, action) => {
            state.value.IsTxSubmitted = false
        },
    },
})

export const { updateIsNetworkOption, updateIsProfile, updateIsWalletOption, updateIsPending, updateIsWaitingForWalletTxConfirm, updateIsWaitingForChangeNetwork, updateIsTxSubmitted, txConfirmedByNetwork, updateDelegateProfitToken, updateDelegateMakerToken } = modalsSlice.actions
export default modalsSlice.reducer