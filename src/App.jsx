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
import ShoppingCart from "./components/Shopping_cart/Shopping_cart";
import Carrousel from "./components/Carrousel/Carrousel";
import PurchaseInfo from "./components/Purchase_info/Purchase_info";

function App() {
  const dispatch = useDispatch();
  const product = fakeData[0];
  useEffect(() => {
    axios
      .post("http://localhost:3001/api/auth/me", null, {
        withCredentials: true,
      })
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => {});
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarComponent />
              <Carrousel />
              <Grid />
              <PurchaseInfo />
            </>
          }
        />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/product/:id"
          element={<ProductDetails product={product} />}
        />
        <Route
          path="/shoppingCart"
          element={
            <>
              <NavbarComponent />
              <ShoppingCart />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
