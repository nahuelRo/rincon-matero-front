import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./product_details.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/cartReducer";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [oneProduct, setOneProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        setOneProduct(res.data);
      })
      .catch(() => {});
  }, []);

  const handleClick = () => {
    dispatch(addToCart(oneProduct));
  };

  return (
    <>
      <div className={styles["product-details"]}>
        <Link to={"/"}>
          <div className={styles["button-return"]}>VOLVER</div>
        </Link>
        <div className={styles["product-image-container"]}>
          <img
            src={oneProduct.image}
            alt={oneProduct.name}
            className={styles["product-image"]}
          />
        </div>
        <div className={styles["product-info"]}>
          <h1 className={styles["product-title"]}>{oneProduct.name}</h1>
          <p className={styles["product-description"]}>
            {oneProduct.description}
          </p>
          <div className={styles["product-price"]}>${oneProduct.price}</div>
          <div className={styles["product-stock"]}>
            Cantidad de unidades disponibles: {oneProduct.stock}
          </div>
          <div>
            <button
              className={styles["add-to-cart-button"]}
              onClick={handleClick}
            >
              AÑADIR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
