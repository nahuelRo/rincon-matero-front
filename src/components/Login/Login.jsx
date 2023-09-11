import React, { useRef } from "react";
import axios from "axios";
import styles from "./login.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/userReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginRef = useRef();
  const dispatch = useDispatch();

  const handdleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handdlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //USERS
    axios
      .post(
        "http://localhost:3001/api/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => dispatch(setUser(res.data)));

    loginRef.current.classList.add("login--active");
    navigate("/");
  };

  const handlerClick = () => {
    loginRef.current.classList.add("login--active");
  };

  return (
    <>
      <section ref={loginRef} className={styles.login}>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={styles["login__form"]}
        >
          <div className={styles["login__header"]}>
            <h2 className={styles["login__title"]}>Inicia Sesión</h2>
            <Link to={"/"}>
              <p className={styles["login__exit"]} onClick={handlerClick}>
                X
              </p>
            </Link>
          </div>
          <div className={styles["login__container"]}>
            <div className={styles["login__email"]}>
              <label className={styles["form-label"]}>Email</label>
              <input
                placeholder="email@mail.com"
                type="text"
                className={styles["form-control"]}
                id="staticEmail2"
                onChange={handdleEmail}
                value={email}
              />
            </div>
            <div className={styles["login__password"]}>
              <label className="form-label">Contraseña</label>
              <input
                placeholder="********"
                type="password"
                className={styles["form-control"]}
                id="inputPassword2"
                onChange={handdlePassword}
                value={password}
              />
            </div>
          </div>
          <div className={styles["mb-3"]}>
            <Link to="/register">
              <label className={styles["form-check-label"]}>Registro</label>
            </Link>
          </div>
          <button type="submit" className={styles["login__submit"]}>
            Enviar
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
