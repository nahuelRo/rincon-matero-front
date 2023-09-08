import React from "react";
import logoRinconMatero from "../assets/logo rincon matero.png";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <>
      <div className="nav-header">
        <div className="logo">
          <img
            src={logoRinconMatero}
            alt="logo-rincon-matero"
            className="logo-img"
          />
        </div>
        <div className="buttons">
          <Link to={"/login"}>
            <button className="buttonlogin-navbar">INICIAR SESIÓN</button>
          </Link>
          <Link to={"/register"}>
            <button className="buttonRegister-navbar">REGISTRATE</button>
          </Link>
        </div>
      </div>

      <nav className="navbar">
        <div className="center">
          <button className="nav-button">INICIO</button>
          <button className="nav-button">PRODUCTOS</button>
        </div>

        <div className="left">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
