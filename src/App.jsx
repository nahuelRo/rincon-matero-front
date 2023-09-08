import React from "react";
import ProductDetails from "./components/Product_details";
import "./styles/styles.scss";
import fakeData from "./utils/fakeData";
import Register from "./components/Register";
import NavbarComponent from "./components/Navbar";
import Grid from "./components/Grid";
import { Route, Routes } from "react-router-dom";

function App() {
  const product = fakeData[0];

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

        <Route
          path="/productDetails/1"
          element={<ProductDetails product={product} />}
        />
      </Routes>
    </>
  );
}

export default App;
