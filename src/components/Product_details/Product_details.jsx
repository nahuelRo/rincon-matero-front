import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./product_details.module.scss";

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
      <div className={styles["product-details"]}>
        <Link to={"/"}>
          <div className={styles["button-return"]}>VOLVER</div>
        </Link>
        <div className={styles["product-image-container"]}>
          <img
            src={product.image}
            alt={product.name}
            className={styles["product-image"]}
          />
        </div>
        <div className={styles["product-info"]}>
          <h1 className={styles["product-title"]}>{product.name}</h1>
          <p className={styles["product-description"]}>{product.description}</p>
          <div className={styles["product-price"]}>${product.price}</div>
          <div className={styles["product-stock"]}>
            Cantidad de unidades disponibles: {product.stock}
          </div>
          <div>
            <button className={styles["add-to-cart-button"]}>
              AÑADIR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
