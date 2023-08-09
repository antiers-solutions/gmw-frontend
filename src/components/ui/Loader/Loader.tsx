import React from "react";
import { Triangle } from "react-loader-spinner";
import "./Loader.scss";

/**LOADER COMPONENTS */
const Loader = () => {
  return (
    <div className="overlayloader">
      <Triangle
        height="80"
        width="80"
        color="#fff"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass="something"
        visible={true}
      />
    </div>
  );
};

export default Loader;
