import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import cross from '../../assets/img/cross.svg'

const SelectList = () => {
  const { codes, handleCrypto, selectListOpen, handleSelectList } =
    useContext(AppContext)
  return (
    <div className={`sel-list-container ${selectListOpen}`}>
      <img src={cross} alt="cross" onClick={() => handleSelectList(false)} />
      <ul id="select-list">
        {codes.map((item, i) => (
          <li key={i} value={item} onClick={() => handleCrypto(item)}>
            <img
              src={`/cryptocurrencies/${item}.svg`}
              alt="img"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectList
