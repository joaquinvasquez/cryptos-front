import React from "react";
import Navbar from "./Navbar";
import Error from "./Error";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Error />
    </>
  );
};

export default Layout;
