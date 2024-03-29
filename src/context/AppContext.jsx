import { createContext, useState } from 'react'
import tokens from '../assets/tokens.json'
const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [codes, setCodes] = useState([])
  const [cryptoFrom, setCryptoFrom] = useState('ETH')
  const [cryptoTo, setCryptoTo] = useState('USDT')
  const [amountFrom, setAmountFrom] = useState('')
  const [amountTo, setAmountTo] = useState('')
  const [selectListOpen, setSelectListOpen] = useState('')
  const [error, setError] = useState('')
  const [textError, setTextError] = useState('')
  const [selectCrypto, setSelectCrypto] = useState('')
  const [loading, setLoading] = useState(true)
  const [zeros, setZeros] = useState('empty')

  // LISTA DE CRYPTOS DEL HOME
  const getCurrencyList = async () => {
    const url = `https://data-api.binance.vision/api/v3/ticker/price`
    try {
      const res = await fetch(url)
      const json = await res.json()
      const finalJson = tokens
        .map((item) => {
          const price = json.find(
            (i) => i.symbol === `${item.symbol}USDT`
          )?.price
          return {
            name: item.name,
            code: item.symbol,
            price: parseFloat(price).toFixed(4),
            img: item.urlIcon,
          }
        })
        .filter((item) => item.price !== 'NaN' && item.price !== 'undefined')
        .slice(0, 40)
      setList(finalJson)
      setLoading(false)
      return finalJson
    } catch (err) {
      console.log(err)
      setError('visible')
      setTextError(url)
      setLoading(false)
    }
  }

  // LISTA DE CODES PARA EL DROPDOWN DE TRADE
  const getCodesList = async () => {
    let newList = list
    if (newList.length === 0) {
      newList = await getCurrencyList()
    }
    const codesList = newList.map((item) => item.code)
    setCodes(codesList)
    setLoading(false)
  }

  // INIT TRADE
  const handleCryptoFrom = (code) => {
    setLoading(true)
    setCryptoFrom(code)
    setCryptoTo('USDT')
    setAmountFrom('')
    setAmountTo('')
    setSelectListOpen('')
    setSelectCrypto('')
    setZeros('empty')
  }

  // ROTA LAS CRYPTOS EN TRADE
  const changeCurrencyOrder = () => {
    let cryptoAux = cryptoFrom
    setCryptoFrom(cryptoTo)
    setCryptoTo(cryptoAux)
  }

  // MUESTRA LISTA DE CODES PARA SELECCIONAR
  const handleSelectList = (open) => {
    if (open) {
      setSelectListOpen('visible')
      setSelectCrypto(open)
    } else {
      setSelectListOpen('')
      setSelectCrypto('')
    }
  }

  // SELECCIONA CRYPTO ORIGEN O DESTINO
  const handleCrypto = (item) => {
    if (selectCrypto == 'from') setCryptoFrom(item)
    else if (selectCrypto == 'to') setCryptoTo(item)
    setAmountFrom('')
    setAmountTo('')
    handleSelectList(false)
  }

  // MANEJA LOS VALORES DEL TRADE
  const handleAmounts = (t) => {
    if (t.value >= 0 && t.value !== '') {
      if (t.name === 'from-amount') {
        if (amountTo !== '') setAmountTo('')
        setAmountFrom(t.value)
        setZeros('')
      } else if (t.name === 'to-amount') {
        if (amountFrom !== '') setAmountFrom('')
        setAmountTo(t.value)
        setZeros('')
      }
    } else {
      setAmountFrom('')
      setAmountTo('')
      setZeros('empty')
    }
  }

  // LLAMA A LA API DE TRADE
  const handleCalculator = async () => {
    let value1 = { price: 1 }
    let value2 = { price: 1 }
    let urlError = null
    const setUrl = (param) => {
      return `https://api.binance.com/api/v3/ticker/price?symbol=${param}USDT`
    }
    try {
      if (cryptoFrom !== 'USDT')
        value1 = await fetch(setUrl(cryptoFrom))
          .then((res) => res.json())
          .catch(() => {
            urlError = cryptoFrom
          })
      if (cryptoTo !== 'USDT')
        value2 = await fetch(setUrl(cryptoTo))
          .then((res) => res.json())
          .catch(() => {
            urlError = cryptoTo
          })
      setAmountTo(((value1.price * amountFrom) / value2.price).toFixed(8))
    } catch (err) {
      console.log(err)
      setTextError(setUrl(urlError))
      setError('visible')
    }
  }

  const data = {
    loading,
    setLoading,
    error,
    textError,
    zeros,
    cryptoFrom,
    cryptoTo,
    amountFrom,
    amountTo,
    handleAmounts,
    codes,
    list,
    selectListOpen,
    handleCryptoFrom,
    getCurrencyList,
    getCodesList,
    changeCurrencyOrder,
    handleSelectList,
    handleCrypto,
    handleCalculator,
  }
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>
}

export { AppProvider }
export default AppContext
