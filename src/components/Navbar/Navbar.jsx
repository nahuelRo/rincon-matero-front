import React from "react";
import styles from "./navbar.module.scss";
import logoRinconMatero from "../../assets/logo rincon matero.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setUser } from "../../state/userReducer";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../Search/Search";

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
        <div className={styles["search-bar"]}>
          <div className={styles["wrap"]}>
            <div className={styles["search"]}>
              <input
                type="text"
                className={styles["searchTerm"]}
                placeholder="Buscar..."
              />
              <button type="submit" className={styles["searchButton"]}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div className={styles["empty"]}></div>
        <SearchBar />

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
                <Link to={"/perfil"} className={styles["text-decoration"]}>
                  <button>Ver Perfil</button>
                </Link>

                <Link
                  to={`/historyDetails/${user.id}`}
                  className={styles["text-decoration"]}
                >
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
        {user.role === "ADMIN" ? (
          <div className={styles["dropdown"]}>
            <button className={styles["nav-button"]}>
              OPCIONES DE ADMINISTRADOR
            </button>
            <div className={styles["dropdown-content"]}>
              <Link
                to="/panel-admin/products"
                className={styles["text-decoration"]}
              >
                <button>PRODUCTOS</button>
              </Link>
              <Link
                to="/panel-admin/categories"
                className={styles["text-decoration"]}
              >
                <button>CATEGORIAS</button>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={styles["icon-wrapper"]} onClick={handleClick}>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
