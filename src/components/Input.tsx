import React from "react"

import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { selectConversion } from "../redux/convertion/selectors"
import { asConversionState, Conversion } from "../redux/convertion/types"
import { changeLeftInput, changeRightInput } from "../redux/convertion/slice"
import { convertCurrencies } from "../redux/currency/asyncActions"
import { useDebounce } from "../hooks/useDebounce"
import { selectCurrency } from "../redux/currency/selectors"
import { toggleIsEditable } from "../redux/currency/slice"

interface InputProps {
  name: string,
  type: string,
}

const Input: React.FC<InputProps> = ({ name, type }) => {
  const dispatch = useAppDispatch()
  const conversions = useAppSelector(selectConversion)
  const { conversion, isEditable } = useAppSelector(selectCurrency)
  const id = React.useId()
  const currentInputToChange = name === Conversion.leftInput ? conversions.leftInput : conversions.rightInput
  const debouncedConvertionTerm: number = useDebounce<number>(currentInputToChange, 500);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const currentInput = name === Conversion.leftInput ? changeLeftInput : changeRightInput
    if (conversions.leftSelect !== conversions.rightSelect) {
      dispatch(currentInput(Number(e.currentTarget.value)))
    }
  }

  React.useEffect(() => {
    const currInput = name === Conversion.leftInput ? conversions.leftInput : conversions.rightInput
    if (isEditable && currInput > 0) {
      const inputToChange = name === Conversion.leftInput ? changeRightInput : changeLeftInput
      const result = conversion.result === undefined ? 0 : conversion.result
      dispatch(inputToChange(result))
      dispatch(toggleIsEditable(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversion.result])

  React.useEffect(() => {
    if (debouncedConvertionTerm && conversions.leftSelect !== conversions.rightSelect) {
      dispatch(toggleIsEditable(true))
      const amount = name === Conversion.leftInput ? conversions.leftInput : conversions.rightInput
      if (amount > 0 && isEditable) {
        const currentCurrency = name === Conversion.leftInput ? conversions.leftSelect : conversions.rightSelect
        const finalCurrency = name === Conversion.leftInput ? conversions.rightSelect : conversions.leftSelect
        const request = {
          currentCurrency,
          finalCurrency,
          amount 
        }
        dispatch(convertCurrencies(request))
        dispatch(toggleIsEditable(false))
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedConvertionTerm])

  return (
    <input
      type={type} 
      name={name} 
      id={id}
      value={conversions[name as asConversionState]}
      onInput={handleInput}
    />
  )
}

export default Input