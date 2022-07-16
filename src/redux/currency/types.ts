export interface CurrencyState {
  headerState: Response[],
  conversion: ConvertResponse,
  status: string,
  isEditable: boolean
}

export interface Request {
  currentCurrency: string,
  finalCurrency: string,
  amount?: number,
}

export enum CurrencyEnum {
  UAH = "UAH",
  USD = "USD",
  EUR = "EUR",
}

export interface Response {
  base: string,
  date: string,
  rates: {},
  success: boolean,
  timestamp: number
}

type ConvertResponseInfo = {
  rate: number,
  timestamp: number,
}
type ConvertResponseQuery = {
  amount: number,
  from: string,
  to: string,
}

export interface ConvertResponse {
  date: string,
  historical: string,
  info: ConvertResponseInfo,
  query: ConvertResponseQuery,
  result: number,
  success: boolean,
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}