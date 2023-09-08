import React from "react";
import "../styles/components/Navbar.scss";
import "font-awesome/css/font-awesome.min.css";
import logoRinconMatero from "../assets/logo rincon matero.png";

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
          <button className="login">INICIAR SESIÓN</button>
          <button className="register">REGISTRATE</button>
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
