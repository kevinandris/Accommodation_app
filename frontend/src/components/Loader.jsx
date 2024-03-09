// ! Loader preventing us from errors while loading and fetching the data
import React from "react";
import "../styles/Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-inner"></div>
    </div>
  );
};

export default Loader;
