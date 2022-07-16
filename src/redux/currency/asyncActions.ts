import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { Request, Response, ConvertResponse } from "./types"
import { requestOptions } from "../../utils/requestOptions"

export const fetchCurrencies = createAsyncThunk<Response, Request>(
  'currency/fetchCurrencies',
  async (params) => {
    const { currentCurrency, finalCurrency } = params
    const { data } = await axios.get(`latest?symbols=${finalCurrency}&base=${currentCurrency}`, requestOptions)
    return data
  },
)

export const convertCurrencies = createAsyncThunk<ConvertResponse, Request>(
  'conversion/convertCurrencies',
  async (params) => {
    const { currentCurrency, finalCurrency, amount } = params
    const { data } = await axios.get(`convert?to=${finalCurrency}&from=${currentCurrency}&amount=${amount}`, requestOptions)
    return data
  },
)