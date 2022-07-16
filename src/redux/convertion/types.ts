export interface ConversionState {
  leftSelect: string,
  rightSelect: string,
  leftInput: number,
  rightInput: number,
}

export enum Conversion {
  leftSelect = "leftSelect",
  rightSelect = "rightSelect",
  leftInput = "leftInput",
  rightInput = "rightInput",
}

export type asConversionState = keyof ConversionState 