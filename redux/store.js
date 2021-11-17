import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './slices/addressSlice'
import balanceReducer from './slices/balanceSlice'
import tokenbalanceReducer from './slices/tokenbalanceSlice'
import networkReducer from './slices/networkSlice'
import priceReducer from './slices/priceSlice'
export const store = configureStore({
  reducer: {
    address: addressReducer,
    balance: balanceReducer,
    network: networkReducer,
    tokenBalance: tokenbalanceReducer,
    price: priceReducer,
  },
})