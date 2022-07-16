import { configureStore } from '@reduxjs/toolkit'
import currency from "./currency/slice"
import conversion from "./convertion/slice"


export const store = configureStore({
  reducer: {
    currency,
    conversion,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch