import axios from "axios";
import styles from "./register.module.scss";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../commons/Input/Input";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post(
      "http://localhost:3001/api/auth/register",
      {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        address: data.address,
        password: data.password,
        role: "USER",
      },
      { withCredentials: true }
    );
  };

  const handleClick = () => {
    sectionRef.current.classList.add(styles.container_active);
    navigate("/");
  };

  return (
    <section ref={sectionRef} className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={styles.form}
      >
        <header className={styles.header}>
          <h2 className={styles["header__title"]}>Crear cuenta</h2>
          <p className={styles["header__exit"]} onClick={handleClick}>
            X
          </p>
        </header>

        <hr className={styles.separator} />

        <div className={styles.fieldsWrapper}>
          <div className={styles.twofields}>
            <Input
              name="nombre"
              type="text"
              controller={register("name", {
                required: { value: true, message: "Nombre es requerido" },
                maxLength: {
                  value: 20,
                  message: "Debe tener como máximo 20 caracteres",
                },
              })}
              errors={errors.name && errors.name.message}
            />

            <Input
              name="apellido"
              type="text"
              controller={register("last_name", {
                required: { value: true, message: "Apellido es requerido" },
                maxLength: {
                  value: 20,
                  message: "Debe tener como máximo 20 caracteres",
                },
              })}
              errors={errors.last_name && errors.last_name.message}
            />
          </div>

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
            name="dirección"
            type="text"
            controller={register("address", {
              required: { value: true, message: "Dirección es requerido" },
            })}
            errors={errors.address && errors.address.message}
          />

          <div className={styles.twofields}>
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

            <Input
              name="Confirmar contraseña"
              type="password"
              controller={register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirmar contraseña es requerido",
                },
                validate: (value) =>
                  value === watch("password")
                    ? true
                    : "Las contraseñas no son iguales",
              })}
              errors={errors.confirmPassword && errors.confirmPassword.message}
            />
          </div>
        </div>

        <hr className={styles.separator} />

        <button className={styles.submit} value="CREAR CUENTA">
          {isLoading ? "Loading" : "CREAR CUENTA"}
        </button>
      </form>
    </section>
  );
};

export default Register;
