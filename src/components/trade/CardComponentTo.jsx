import { useContext } from 'react'
import AppContext from '../../context/AppContext'

const CardComponentTo = () => {
  const { cryptoTo, amountTo, handleAmounts, handleSelectList } =
    useContext(AppContext)
  return (
    <div className="trade-to">
      <span className="note">To</span>
      <input
        readOnly
        type="number"
        name="to-amount"
        id="to-amount"
        placeholder="0.00"
        value={amountTo}
        onChange={(e) => handleAmounts(e.target)}
      />

      <button className="dropdown-btn" onClick={() => handleSelectList('to')}>
        <img
          src={`/cryptocurrencies/${cryptoTo}.svg`}
          alt="img"
        />
        <span>{cryptoTo}</span>
      </button>
    </div>
  )
}

export default CardComponentTo
