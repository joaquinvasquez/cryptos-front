import React from "react";
import LogoExi from "../../assets/img/logo-exi.svg";
import LogoOS from "../../assets/img/logo-openshift.svg";
// import LogoOS from "../../assets/img/logo-kubernetes.svg";
import BtnsGroup from "./BtnsGroup";

const Navbar = () => {
  return (
    <>
      <header>
        <a href="https://exisoft.com.ar" target="_blank">
          <img className="logoExi" src={LogoExi} alt="logoExi" />
        </a>
        <a
          href="https://www.redhat.com/es/technologies/cloud-computing/openshift"
          target="_blank"
        >
          <img className="logoOpenShift" src={LogoOS} alt="logoOpenShift" />
        </a>
        <div className="header-btns">
          <BtnsGroup />
        </div>
      </header>
    </>
  );
};

export default Navbar;
