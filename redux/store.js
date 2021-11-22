import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './slices/addressSlice'
import balanceReducer from './slices/balanceSlice'
import tokenbalanceReducer from './slices/tokenbalanceSlice'
import networkReducer from './slices/networkSlice'
import syncReducer from './slices/syncSlice'
import priceReducer from './slices/priceSlice'
import modalsReducer from './slices/modalsSlice'
export const store = configureStore({
  reducer: {
    address: addressReducer,
    balance: balanceReducer,
    network: networkReducer,
    sync: syncReducer,
    tokenBalance: tokenbalanceReducer,
    price: priceReducer,
    modals: modalsReducer,
  },
})