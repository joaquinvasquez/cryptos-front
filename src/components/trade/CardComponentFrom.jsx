import { useContext } from 'react'
import AppContext from '../../context/AppContext'

const CardComponentFrom = () => {
  const { cryptoFrom, amountFrom, handleAmounts, handleSelectList } =
    useContext(AppContext)
  return (
    <div className="trade-from">
      <span className="note">From</span>
      <input
        type="number"
        name="from-amount"
        id="from-amount"
        placeholder="0.00"
        value={amountFrom}
        onChange={(e) => handleAmounts(e.target)}
      />

      <button className="dropdown-btn" onClick={() => handleSelectList('from')}>
        <img
          src={`/cryptocurrencies/${cryptoFrom}.svg`}
          alt="img"
        />
        <span>{cryptoFrom}</span>
      </button>
    </div>
  )
}

export default CardComponentFrom
