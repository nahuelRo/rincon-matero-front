import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//y cuando se conecte seria sin la prop de product
const ProductDetails = ({ product }) => {
  const [oneProduct, setOneProduct] = useState({}); //usaria oneProduct.name o oneProduct.description etc.
  const id = 1; //use params para conectar a la base de datos

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        setOneProduct(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="product-details">
        <Link to={"/"}>
          <div className="button-return">VOLVER</div>
        </Link>
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="product-price">${product.price}</div>
          <div className="product-stock">
            Cantidad de unidades disponibles: {product.stock}
          </div>
          <div>
            <button className="add-to-cart-button">AÑADIR AL CARRITO</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
