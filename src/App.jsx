import React from "react";
import ProductDetails from "./components/Product_details";
import "./styles/styles.scss";
import fakeData from "./utils/fakeData";
import Register from "./components/Register";
import NavbarComponent from "./components/Navbar";
import Grid from "./components/Grid";
import Login from "./components/Login";

function App() {
  const product = fakeData[0];

  return (
    <>
      <NavbarComponent />
      <h1>Rincon Matero</h1>
      <ProductDetails product={product} />
      <Register />
      <Login />
      <Grid />
    </>
  );
}

export default App;
