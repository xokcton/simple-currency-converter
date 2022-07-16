import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import type { PayloadAction } from "@reduxjs/toolkit"

import { CurrencyState, Status, ConvertResponse } from "./types"
import { fetchCurrencies, convertCurrencies } from "./asyncActions"

const initialState: CurrencyState = {
  headerState: [],
  conversion: {} as ConvertResponse,
  status: Status.LOADING,
  isEditable: false
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    toggleIsEditable: (state, action: PayloadAction<boolean>) => {
      state.isEditable = action.payload
    },
  },
  extraReducers: (builder) => {
    // fetch currencies
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.status = Status.LOADING
      state.headerState = []
    })
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.headerState.push(action.payload)
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchCurrencies.rejected, (state) => {
      state.status = Status.ERROR
      state.headerState = []
    })
    // convert currencies
    builder.addCase(convertCurrencies.pending, (state) => {
      state.status = Status.LOADING
      state.conversion = {} as ConvertResponse
      state.isEditable = false
    })
    builder.addCase(convertCurrencies.fulfilled, (state, action) => {
      state.isEditable = true
      state.conversion = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(convertCurrencies.rejected, (state) => {
      state.status = Status.ERROR
      state.conversion = {} as ConvertResponse
      state.isEditable = false
    })
  }
})

export const { toggleIsEditable } = currencySlice.actions

export default currencySlice.reducer