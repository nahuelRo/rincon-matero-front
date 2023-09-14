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

import HistoryDetails from "./components/history_details/History_details";

import Dashboard from "./commons/Dashboard/Dashboard";
import Panel_edit from "./components/Panel_edit/Panel_edit";

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

        <Route path="/panel-admin/:name" element={<Dashboard />} />
        <Route path="/panel-edit/:name/:id" element={<Panel_edit />} />

        <Route
          path="/product/:id"
          element={
            <>
              {" "}
              <NavbarComponent /> <ProductDetails product={product} />{" "}
              <PurchaseInfo />{" "}
            </>
          }
        />
        <Route
          path="/shoppingCart"
          element={
            <>
              <NavbarComponent />
              <ShoppingCart />
              <PurchaseInfo />
            </>
          }
        />
        <Route
          path="/historyDetails/:id"
          element={
            <>
              <NavbarComponent />
              <HistoryDetails />
              <PurchaseInfo />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
