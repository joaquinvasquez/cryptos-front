import React, { useContext, useEffect, useState } from "react";
import Currency from "../components/home/Currency";
import AppContext from "../context/AppContext";
const Home = () => {
  const { loading, getCurrencyList, list } = useContext(AppContext);

  useEffect(() => {
    getCurrencyList();
  }, [list]);

  return (
    <>
      {!loading ? (
        <ul className="cryptos">
          {list.map((item, i) => (
            <Currency
              key={i}
              name={item.name}
              code={item.code}
              price={item.price}
              img={item.img}
            />
          ))}
        </ul>
      ) : (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      )}
    </>
  );
};

export default Home;
