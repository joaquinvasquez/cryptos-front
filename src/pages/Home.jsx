import { useContext, useEffect } from 'react'
import Currency from '../components/home/Currency'
import AppContext from '../context/AppContext'
const Home = () => {
  const { loading, getCurrencyList, list } = useContext(AppContext)

  useEffect(() => {
    const interval = setTimeout(() => {
      getCurrencyList()
    }, 1000)
    return () => clearTimeout(interval)
  }, [list])

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
  )
}

export default Home
