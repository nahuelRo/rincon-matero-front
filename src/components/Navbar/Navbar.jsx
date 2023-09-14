import React from "react";
import styles from "./navbar.module.scss";
import logoRinconMatero from "../../assets/logo rincon matero.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setUser } from "../../state/userReducer";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const NavbarComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout", null, {
        withCredentials: true,
      });

      dispatch(
        setUser({
          address: null,
          email: null,
          id: 0,
          last_name: null,
          name: null,
          role: null,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
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
          {user.name ? (
            <div className={styles["dropdown"]}>
              <button className={styles["buttonlogin-navbar"]}>
                MI CUENTA
              </button>
              <div className={styles["dropdown-content"]}>
                <Link to={"/perfil"}>
                  <button>Ver Perfil</button>
                </Link>
                <Link to={"/historyDetails/"}>
                  <button>Mis compras</button>
                </Link>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className={styles["buttonlogin-navbar"]}>
                  INICIAR SESIÓN
                </button>
              </Link>
              <Link to="/register">
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

          {location.pathname === "/" ? (
            <a href="#scroll" className={styles["nav-button"]}>
              PRODUCTOS
            </a>
          ) : (
            <Link to="/">
              <button className={styles["nav-button"]}>PRODUCTOS</button>
            </Link>
          )}

          <Link to="/">
            <div className={styles["dropdown"]}>
              <button className={styles["nav-button"]}>
                OPCIONES DE ADMINISTRADOR
              </button>
              <div className={styles["dropdown-content"]}>
                <Link to="/panel-admin/products">
                  <button>PRODUCTOS</button>
                </Link>
                <Link to="/panel-admin/categories">
                  <button>CATEGORIAS</button>
                </Link>
              </div>
            </div>
          </Link>
        </div>

        <div className={styles["left"]}>
          <i className="fa-solid fa-cart-shopping" onClick={handleClick}></i>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
