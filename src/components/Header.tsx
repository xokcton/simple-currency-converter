import React from "react"

import { Response, Request, CurrencyEnum, Status } from "../redux/currency/types"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { fetchCurrencies } from "../redux/currency/asyncActions"
import { selectCurrency } from "../redux/currency/selectors"

import { HeaderContainer } from "../styles"
import { BsCurrencyEuro, BsCurrencyDollar } from "react-icons/bs"
import { FaHryvnia } from "react-icons/fa"


const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const currencies = useAppSelector(selectCurrency)

  const getCertainCurrency = (name: string): number => {
    if (currencies.status === Status.SUCCESS) {
      const currency = currencies.headerState.filter((elem: Response) => elem.base === name)[0]
      if (currency && currency.rates)
        return Number(Number(Object.values(currency.rates)[0]).toFixed(3))
    }
    return 0
  }

  React.useEffect(() => {
    const params: Request = {
      currentCurrency: CurrencyEnum.USD,
      finalCurrency: CurrencyEnum.UAH
    }
    dispatch(fetchCurrencies(params))
    params.currentCurrency = CurrencyEnum.EUR
    dispatch(fetchCurrencies(params))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HeaderContainer>
      <div className="wrapper">
        <div className="logo">Currency Converter</div>
        <div className="exchange-rate">
          <div>
            <BsCurrencyDollar />
            <p>{ getCertainCurrency(CurrencyEnum.USD) }</p>
          </div>
          <div>
            <BsCurrencyEuro />
            <p>{ getCertainCurrency(CurrencyEnum.EUR) }</p>
          </div>
          <div>
            <p className="to">to</p>
            <FaHryvnia />
          </div>
        </div>
      </div>
    </HeaderContainer>
  )
}

export default Header