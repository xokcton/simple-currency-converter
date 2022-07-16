import React from 'react'

import { CurrencyEnum, Request } from "../redux/currency/types"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { selectConversion } from "../redux/convertion/selectors"
import { selectCurrency } from "../redux/currency/selectors"
import { asConversionState, Conversion } from "../redux/convertion/types"
import { changeLeftInput, changeLeftSelect, changeRightInput, changeRightSelect } from "../redux/convertion/slice"
import { convertCurrencies } from "../redux/currency/asyncActions"
import { toggleIsEditable } from "../redux/currency/slice"

interface SelectPrors {
  name: string,
}

const Select: React.FC<SelectPrors> = ({ name }) => {
  const dispatch = useAppDispatch()
  const conversions = useAppSelector(selectConversion)
  const { isEditable } = useAppSelector(selectCurrency)
  const id = React.useId()
  const currentSelect = name === Conversion.leftSelect ? changeLeftSelect : changeRightSelect
  
  const equalizeInputs = (): void => {
    dispatch(changeRightInput(0))
    dispatch(changeLeftInput(0))
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(currentSelect(e.currentTarget.value))
  }

  React.useEffect(() => {
    if (conversions.leftSelect === conversions.rightSelect) {
      equalizeInputs()
    } else {
      dispatch(toggleIsEditable(true))
      const request: Request = {
        currentCurrency: name === Conversion.leftSelect ? conversions.leftSelect : conversions.rightSelect,
        finalCurrency: (name === Conversion.leftSelect ? conversions.rightSelect : conversions.leftSelect),
        amount: Number(name === Conversion.leftSelect ? conversions.leftInput : conversions.rightInput),
      } 
      if (request.amount && request.amount > 0 && isEditable) {
        dispatch(convertCurrencies(request))
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversions.leftSelect, conversions.rightSelect])

  return (
    <select name={name} id={id} value={conversions[name as asConversionState]} onChange={handleChange}>
      {
        Object.values(CurrencyEnum).map((elem: string, index: number) => (
          <option key={index} value={elem}>{ elem }</option>
        ))
      }
    </select>
  )
}

export default Select