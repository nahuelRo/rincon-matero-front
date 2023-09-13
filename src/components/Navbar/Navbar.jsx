import React from "react";
import styles from "./navbar.module.scss";
import logoRinconMatero from "../../assets/logo rincon matero.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const NavbarComponent = () => {
  // const user = useSelector((state) => state.user);

  const userNoparse = localStorage.getItem("user");
  const user = JSON.parse(userNoparse);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout");

      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleClick = () => {
    navigate("/shoppingCart");
  };

  return (
    <>
      <div className={styles["nav-header"]}>
        <div className={styles["empty"]}></div>
        <div className={styles["logo"]}>
          <img
            src={logoRinconMatero}
            alt="logo-rincon-matero"
            className={styles["logo-img"]}
          />
        </div>
        <div className={styles["buttons"]}>
          {user ? (
            <button
              className={styles["buttonlogin-navbar"]}
              onClick={handleLogout}
            >
              CERRAR SESIÓN
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className={styles["buttonlogin-navbar"]}>
                  INICIAR SESIÓN
                </button>
              </Link>
              <Link to={"/register"}>
                <button className={styles["buttonRegister-navbar"]}>
                  REGISTRATE
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className={styles["navbar"]}>
        <div className={styles["center"]}>
          <Link to="/">
            <button className={styles["nav-button"]}>INICIO</button>
          </Link>
          <button className={styles["nav-button"]}>PRODUCTOS</button>
        </div>

        <div className={styles["left"]}>
          <i className="fa-solid fa-cart-shopping" onClick={handleClick}></i>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
