import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './slices/addressSlice'
import balanceReducer from './slices/balanceSlice'
import networkReducer from './slices/networkSlice'
export const store = configureStore({
  reducer: {
    address: addressReducer,
    balance: balanceReducer,
    network: networkReducer,
  },
})