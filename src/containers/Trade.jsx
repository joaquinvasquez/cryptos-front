import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import CardComponentFrom from "../components/trade/CardComponentFrom";
import CardComponentTo from "../components/trade/CardComponentTo";
import changeIcon from "./../assets/img/currency_exchange.svg";
import SelectList from "../components/trade/SelectList";

const Trade = () => {
  const {
    loading,
    setLoading,
    texts,
    changeCurrencyOrder,
    getCodesList,
    handleCalculator,
    zeros,
  } = useContext(AppContext);
  useEffect(() => {
    getCodesList();
  }, [texts]);

  return (
    <>
      {!loading ? (
        <section className="trade-container">
          <div className="trade-card">
            <CardComponentFrom />
            <div id="trade-icon" onClick={() => changeCurrencyOrder()}>
              <img src={changeIcon} alt="changeIcon" />
            </div>
            <CardComponentTo />
          </div>
          <div className={`trade-btns ${zeros}`}>
            <Link to="/" onClick={() => setLoading(true)}>
              {texts[2]}
            </Link>
            <span onClick={() => handleCalculator()}>{texts[3]}</span>
          </div>
          <SelectList />
        </section>
      ) : (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      )}
    </>
  );
};

export default Trade;
