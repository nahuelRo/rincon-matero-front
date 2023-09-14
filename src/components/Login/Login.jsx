import React, { useRef } from "react";
import axios from "axios";
import styles from "./login.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/userReducer";
import { useForm } from "react-hook-form";
import Input from "../../commons/Input/Input";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //USERS
    setIsLoading(true);
    axios
      .post(
        "http://localhost:3001/api/auth/login",
        { email: data.email, password: data.password },
        { withCredentials: true }
      )
      .then((res) => {
        setIsLoading(false), dispatch(setUser(res.data));
        navigate("/");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={styles.form}
      >
        <header className={styles.header}>
          <h2 className={styles["header__title"]}>Iniciar sesión</h2>
          <p className={styles["header__exit"]} onClick={handleClick}>
            X
          </p>
        </header>

        <hr className={styles.separator} />

        <div className={styles.fieldsWrapper}>
          <Input
            name="email"
            type="email"
            controller={register("email", {
              required: { value: true, message: "Email es requerido" },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Correo invalido",
              },
            })}
            errors={errors.email && errors.email.message}
          />

          <Input
            name="contraseña"
            type="password"
            controller={register("password", {
              required: { value: true, message: "Contraseña es requerido" },
              minLength: {
                value: 6,
                message: "Debe tener más de 6 caracteres",
              },
            })}
            errors={errors.password && errors.password.message}
          />
        </div>

        <hr className={styles.separator} />

        <p className={styles.text}>
          ¿Aún no tiene cuenta? <Link to="/register">Crear cuenta</Link>
        </p>

        <button className={styles.submit} disabled={isLoading}>
          {isLoading ? (
            <span className={styles["loader"]}></span>
          ) : (
            "Iniciar sesion"
          )}
        </button>
      </form>
    </section>
  );
};

export default Login;
