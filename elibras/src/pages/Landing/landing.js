import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import logoimg from "../../assets/images/eLibras.svg";
import landingimg from "../../assets/images/landing.svg";
import studyicon from "../../assets/images/icons/study.svg";
import Libras from "../../assets/images/Libras.png";
import Ifc from "../../assets/images/Logo_IFC.png";
import giveClassesicon from "../../assets/images/icons/give-classes.svg";
import purplehearticon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";

function Landing() {
  return (
    <div id="page-landing">
      
      <div className="logosLanding">
        <img className="logoImg" src={Libras} alt="libras" />
        <img  className="logoImg ifcLogo"src={Ifc} alt="" />
      </div>

      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoimg} alt="logo" />

          <h2 className="plataforma">Sua plataforma de estudos em Libras online</h2>
        </div>
        <img
          src={landingimg}
          alt="Platarforma de estudos"
          className="hero-image"
        />
        <div className="buttons-container">
          <Link to="/login" className="study">
            <img src={studyicon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesicon} alt="Saber Mais" />
            Saber Mais
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
