import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginRef = useRef();

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
      .post("http://localhost:3001/api/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.data.name,
            id: res.data.id,
            email: res.data.email,
            lastname: res.data.lastname,
          })
        );
      })
      .then(() => navigate("/"))
      .catch(() => alert("Usuario no existe"));
    navigate("/");
  };

  const handlerClick = () => {
    loginRef.current.classList.add("login--active");
  };

  return (
    <>
      <section ref={loginRef} className="login">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="login__form"
        >
          <div className="login__header">
            <h2 className="login__title">Login</h2>
            <p className="login__exit" onClick={handlerClick}>
              X
            </p>
          </div>
          <div className="login__container">
            <div className="login__email">
              <label className="form-label">Email</label>
              <input
                placeholder="email@mail.com"
                type="text"
                className="form-control"
                id="staticEmail2"
                onChange={handdleEmail}
                value={email}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="login__password">
              <label className="form-label">Password</label>
              <input
                placeholder="********"
                type="password"
                className="form-control"
                id="inputPassword2"
                onChange={handdlePassword}
                value={password}
              />
            </div>
          </div>
          <div className="mb-3">
            <Link to="/register">
              <label className="form-check-label">Register</label>
            </Link>
          </div>
          <button type="submit" className="login__submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
