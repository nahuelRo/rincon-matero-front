import React from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductDetails from "./components/Product_details/Product_details";
import fakeData from "./utils/fakeData";
import Register from "./components/Register/Register";
import NavbarComponent from "./components/Navbar/Navbar";
import Grid from "./components/Grid/Grid";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { useDispatch } from "react-redux";
import { setUser } from "./state/userReducer";

function App() {
  const product = fakeData[0];
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .post("http://localhost:3001/api/auth/me", null, {
        withCredentials: true,
      })
      .then((res) => dispatch(setUser(res.data)));
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarComponent />
              <Grid />
            </>
          }
        />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/productDetails/1"
          element={<ProductDetails product={product} />}
        />
      </Routes>
    </>
  );
}

export default App;
