import { useRef } from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const name = useInput();
  const lastname = useInput();
  const email = useInput();
  const address = useInput();
  const password = useInput();
  const registerRef = useRef();
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();

    axios.post(
      "http://localhost:3001/api/auth/register",
      {
        name: name.value,
        last_name: lastname.value,
        email: email.value,
        address: address.value,
        password: password.value,
      },
      { withCredentials: true }
    );
    registerRef.current.classList.add("register--active");
    navigate("/");
  };

  const handlerClick = () => {
    registerRef.current.classList.add("register--active");
    navigate("/");
  };

  return (
    <section ref={registerRef} className="register">
      <form
        onSubmit={handlerSubmit}
        autoComplete="off"
        className="register__form"
      >
        <div className="register__header">
          <h2 className="register__title">Crear cuenta</h2>
          <p className="register__exit" onClick={handlerClick}>
            X
          </p>
        </div>
        <hr className="register__separator" />
        <div className="register__container">
          <div className="register__field-right">
            <label htmlFor="name">Nombre</label>
            <input {...name} type="text" name="name" id="name" required />
          </div>
          <div className="register__field-left">
            <label htmlFor="lastname">Apellido</label>
            <input
              {...lastname}
              type="text"
              name="lastname"
              id="lastname"
              required
            />
          </div>
        </div>
        <div className="register__email">
          <label htmlFor="email">Email</label>
          <input {...email} type="email" name="email" id="email" required />
        </div>
        <div className="register__address">
          <label htmlFor="address">Dirección</label>
          <input
            {...address}
            type="text"
            name="address"
            id="address"
            required
          />
        </div>
        <div className="register__password">
          <label htmlFor="password">Contraseña</label>
          <input
            {...password}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>

        <hr className="register__separator" />
        <div className="register__submit">
          <input type="submit" value="CREAR CUENTA" />
        </div>
      </form>
    </section>
  );
};

export default Register;
