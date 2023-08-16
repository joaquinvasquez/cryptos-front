import React, { useContext, useEffect, useState } from "react";
import Power from "../../assets/img/PowerSVG";
import AppContext from "../../context/AppContext";
import idiomas from "../../assets/Idiomas.json";

const BtnsGroup = () => {
  const [show, setShow] = useState(false);
  const { texts, setTexts, charge, handleCharge, initCharge } =
    useContext(AppContext);
  const handleShow = () => {
    if (show) setShow(false);
    else setShow(true);
  };

  useEffect(() => {
    initCharge();
  }, []);
  return (
    <>
      <div className="btn-burguer-cont" onClick={() => handleShow()}>
        <div className="btn-burguer"></div>
      </div>
      {show ? (
        <>
          <div className="btns-group">
            {/* <span className="git-versions" data-hover={texts[9]}>
              <select name="versions" id="versions">
                <option value="v1.0">V1.0</option>
                <option value="v2.0">V2.0</option>
                <option value="v3.0">V3.0</option>
                <option value="v4.0">V4.0</option>
              </select>
            </span> */}
            <span className="simulacion-carga" data-hover={texts[7]}>
              <Power onClick={handleCharge} className={charge} />
            </span>
            <span className="lang-btn" data-hover={texts[8]}>
              <span className={`lang-window ${texts[4]}`}>
                <div className="lang-container">
                  <span
                    className="lang-item"
                    onClick={() => setTexts(idiomas.es)}
                  >
                    ES
                  </span>
                  <span
                    className="lang-item"
                    onClick={() => setTexts(idiomas.en)}
                  >
                    EN
                  </span>
                </div>
              </span>
            </span>
          </div>
          <div className="btns-back" onClick={() => handleShow()}></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default BtnsGroup;
