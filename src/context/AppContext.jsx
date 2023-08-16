import { createContext, useState } from "react";
import axios from "axios";
import idiomas from "../assets/Idiomas.json";

const AppContext = createContext();

const baseUrl = "http://bff-demo-ocp.apps.exiocp.exisoft.local/bff/v1";

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [codes, setCodes] = useState([]);
  const [cryptoFrom, setCryptoFrom] = useState("TUSD");
  const [cryptoTo, setCryptoTo] = useState("ETH");
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [selectListOpen, setSelectListOpen] = useState("");
  const [error, setError] = useState("");
  const [textError, setTextError] = useState("");
  const [selectCrypto, setSelectCrypto] = useState("");
  const [texts, setTexts] = useState(idiomas.es);
  const [loading, setLoading] = useState(true);
  const [zeros, setZeros] = useState("empty");
  const [charge, setCharge] = useState("OFF");

  // LISTA DE CRYPTOS DEL HOME
  const getCurrencyList = async () => {
    const url = `${baseUrl}/currency`;
    await axios
      .get(url)
      .then((res) => {
        setList(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("visible");
        setTextError(url);
        setLoading(false);
      });
  };

  // LISTA DE CODES PARA EL DROPDOWN DE TRADE
  const getCodesList = async () => {
    const url = `${baseUrl}/token`;
    await axios
      .get(url)
      .then((res) => {
        setCodes(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("visible");
        setTextError(url);
        setLoading(false);
      });
  };

  // INIT TRADE
  const handleCryptoFrom = (code) => {
    setLoading(true);
    setCryptoFrom("TUSD");
    setCryptoTo(code);
    setAmountFrom("");
    setAmountTo("");
    setSelectListOpen("");
    setSelectCrypto("");
    setZeros("empty");
  };

  // ROTA LAS CRYPTOS EN TRADE
  const changeCurrencyOrder = () => {
    let cryptoAux = cryptoFrom;
    let amountAux = amountFrom;
    setCryptoFrom(cryptoTo);
    setCryptoTo(cryptoAux);
    setAmountFrom(amountTo);
    setAmountTo(amountAux);
  };

  // MUESTRA LISTA DE CODES PARA SELECCIONAR
  const handleSelectList = (open) => {
    if (open) {
      setSelectListOpen("visible");
      setSelectCrypto(open);
    } else {
      setSelectListOpen("");
      setSelectCrypto("");
    }
  };

  // SELECCIONA CRYPTO ORIGEN O DESTINO
  const handleCrypto = (item) => {
    if (selectCrypto == "from") setCryptoFrom(item);
    else if (selectCrypto == "to") setCryptoTo(item);
    setAmountFrom("");
    setAmountTo("");
    handleSelectList(false);
  };

  // MANEJA LOS VALORES DEL TRADE
  const handleAmounts = (t) => {
    if (t.value >= 0 && t.value !== "") {
      if (t.name === "from-amount") {
        if (amountTo !== "") setAmountTo("");
        setAmountFrom(t.value);
        setZeros("");
      } else if (t.name === "to-amount") {
        if (amountFrom !== "") setAmountFrom("");
        setAmountTo(t.value);
        setZeros("");
      }
    } else {
      setAmountFrom("");
      setAmountTo("");
      setZeros("empty");
    }
  };

  // LLAMA A LA API DE TRADE
  const handleCalculator = async () => {
    const url = `${baseUrl}/trade/${amountFrom}/${cryptoFrom}/${cryptoTo}`;
    await axios
      .get(url)
      .then((res) => setAmountTo(res.data.data.montoMonedaDestino.toFixed(8)))
      .catch(() => {
        setError("visible");
        setTextError(url);
      });
  };

  // LLAMA A LA SIMULACION DE CARGA
  const handleCharge = async () => {
    const url = `${baseUrl}/load`;
    await axios
      .get(url)
      .then((res) => setCharge(res.data.data))
      .catch(() => {
        setError("visible");
        setTextError(url);
      });
  };
  // INIT A LA SIMULACION DE CARGA
  const initCharge = async () => {
    const url = `${baseUrl}/load`;
    await axios
      .get(url)
      .then((res) => {
        if (res.data.data === "ON") initCharge();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const data = {
    texts,
    setTexts,
    charge,
    handleCharge,
    initCharge,
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
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export { AppProvider };
export default AppContext;
