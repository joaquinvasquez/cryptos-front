import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext'

const Currency = ({ name, code, price, img }) => {
  const { handleCryptoFrom } = useContext(AppContext)
  return (
    <li className="currency" onClick={() => handleCryptoFrom(code, img)}>
      <Link to="/trade">
        <div className="name">
          <img src={img} alt="img" />
          <h3>{code}</h3>
          <p>{name}</p>
        </div>
        <p>USD {price}</p>
      </Link>
    </li>
  )
}

export default Currency
