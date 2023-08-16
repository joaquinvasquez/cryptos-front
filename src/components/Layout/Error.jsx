import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Error = () => {
  const { texts, error, textError } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className={`error-bg ${error}`}>
      <div className="error-container">
        <div className="error-title">Error!</div>
        <div className="error-desc">
          {textError}
          <p>{texts[5]}</p>
        </div>
        <button className="error-btn" onClick={() => navigate(0)}>
          {[texts[6]]}
        </button>
      </div>
    </div>
  );
};

export default Error;
