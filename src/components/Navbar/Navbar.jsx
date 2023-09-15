import styles from "./navbar.module.scss";
import logoRinconMatero from "../../assets/logo rincon matero.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setUser } from "../../state/userReducer";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../Search/Search";
import { useEffect, useState } from "react";

const NavbarComponent = ({ handleGrid }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/categories`, { withCredentials: true })
      .then((res) => setCategories(res.data));
  }, []);

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
        <div>
          <Link to="/">
            <button 
              onClick={() => handleGrid()}
              className={styles["nav-button"]}
            >
              INICIO
            </button>
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

          <div className={styles["dropdown"]}>
            <button className={styles["nav-button"]}>CATEGORIAS</button>
            <div className={styles["dropdown-content"]}>
              {categories?.map((category, index) => (
                <Link key={index} className={styles["text-decoration"]}>
                  <button onClick={() => handleGrid(category.id)}>
                    {category.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>

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
        </div>
        <div className={styles["icon-wrapper"]} onClick={handleClick}>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
