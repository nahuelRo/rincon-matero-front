import React from "react";
import ProductDetails from "./components/Product_details";
import "./styles/styles.scss";
import fakeData from "./utils/fakeData";

function App() {
  const product = fakeData[0];

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}

export default App;
