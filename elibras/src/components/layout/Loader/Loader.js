import React from "react";
import styles from "./Loader.css";
import GIF from "../../../assets/images/icons/Settings.gif";

// import { Container } from './styles';

function Loader() {
  return (
    <div className="loaderContainer">
      <img src={GIF} alt="Loader" className="loader" />
    </div>
  );
}

export default Loader;
