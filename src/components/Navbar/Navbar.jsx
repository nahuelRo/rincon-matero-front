import React from "react";
import styles from "./navbar.module.scss";
import logoRinconMatero from "../../assets/logo rincon matero.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className={styles["nav-header"]}>
        <div className={styles["logo"]}>
          <img
            src={logoRinconMatero}
            alt="logo-rincon-matero"
            className={styles["logo-img"]}
          />
        </div>
        {user.name ? <p>Bienvenido {user.name}</p> : ""}
        <div className={styles["buttons"]}>
          <Link to="login">
            <button className={styles["buttonlogin-navbar"]}>
              INICIAR SESIÓN
            </button>
          </Link>
          <Link to={"/register"}>
            <button className={styles["buttonRegister-navbar"]}>
              REGISTRATE
            </button>
          </Link>
        </div>
      </div>

      <nav className={styles["navbar"]}>
        <div className={styles["center"]}>
          <button className={styles["nav-button"]}>INICIO</button>
          <button className={styles["nav-button"]}>PRODUCTOS</button>
        </div>

        <div className={styles["left"]}>
          <i className={styles["fa-solid fa-cart-shopping"]}></i>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
