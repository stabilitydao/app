import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import addressReducer from './slices/addressSlice'
import balanceReducer from './slices/balanceSlice'
import tokenbalanceReducer from './slices/tokenbalanceSlice'
import networkReducer from './slices/networkSlice'
import syncReducer from './slices/syncSlice'
import priceReducer from './slices/priceSlice'
import tokenReducer from './slices/tokenSlice'
import dTokenReducer from './slices/dTokenSlice'
import modalsReducer from './slices/modalsSlice'
import sidebarReducer from './slices/sidebarSlice'
import profitPriceReducer from './slices/profitPriceSlice'
import { contributorsApi } from './slices/contributorsApi'
export const store = configureStore({
  reducer: {
    address: addressReducer,
    balance: balanceReducer,
    network: networkReducer,
    sync: syncReducer,
    tokenBalance: tokenbalanceReducer,
    price: priceReducer,
    token: tokenReducer,
    dToken: dTokenReducer,
    modals: modalsReducer,
    sidebar: sidebarReducer,
    profitpriceIn$: profitPriceReducer,
    [contributorsApi.reducerPath]: contributorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contributorsApi.middleware)
})