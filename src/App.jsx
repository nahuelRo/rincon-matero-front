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

import UserProfileView from "./components/User_profile/User_profile_view";

import Panel_create from "./components/Panel_create/Panel_create";

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
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carrousel />
              <Grid />
            </>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/perfil" element={<UserProfileView />} />

        {/* Dashboard */}

        <Route path="/panel-admin/:name" element={<Dashboard />} />
        <Route path="/panel-edit/:name/:id" element={<Panel_edit />} />
        <Route path="/panel-create/:name" element={<Panel_create />} />

        <Route
          path="/product/:id"
          element={<ProductDetails product={product} />}
        />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route
          path="/historyDetails/:id"
          element={<ProductDetails product={product} />}
        />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/historyDetails/:id" element={<HistoryDetails />} />
      </Routes>
      <PurchaseInfo />
    </>
  );
}

export default App;
