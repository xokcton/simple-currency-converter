import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ConversionState } from "./types"
import { CurrencyEnum } from "../currency/types"

const initialState: ConversionState = {
  leftSelect: CurrencyEnum.UAH,
  rightSelect: CurrencyEnum.USD,
  leftInput: 0,
  rightInput: 0,
}

export const conversionSlice = createSlice({
  name: 'conversion',
  initialState,
  reducers: {
    changeLeftSelect: (state, action: PayloadAction<string>) => {
      state.leftSelect = action.payload
    },
    changeRightSelect: (state, action: PayloadAction<string>) => {
      state.rightSelect = action.payload
    },
    changeLeftInput: (state, action: PayloadAction<number>) => {
      state.leftInput = action.payload
    },
    changeRightInput: (state, action: PayloadAction<number>) => {
      state.rightInput = action.payload
    },
  },
})

export const { changeLeftSelect, changeRightSelect, changeLeftInput, changeRightInput } = conversionSlice.actions

export default conversionSlice.reducer