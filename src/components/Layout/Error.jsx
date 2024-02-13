import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'

const Error = () => {
  const { error, textError } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className={`error-bg ${error}`}>
      <div className="error-container">
        <div className="error-title">Error!</div>
        <div className="error-desc">
          {textError}
          <p>is not responding, try again!</p>
        </div>
        <button className="error-btn" onClick={() => navigate(0)}>
          Accept
        </button>
      </div>
    </div>
  )
}

export default Error
