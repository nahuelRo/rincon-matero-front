import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./product_details.module.scss";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const notify = () =>
    toast.success("Producto agregado a carrito.", {
      icon: "👏",
    });
  const [oneProduct, setOneProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        setOneProduct(res.data);
      })
      .catch(() => {});
  }, [id]);

  const handleClick = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.some((item) => item.id === oneProduct.id)) {
      toast.error("Este producto ya se encuentra en tu carrito.");
      return cart;
    }

    oneProduct.quantity = 1;

    localStorage.setItem("cart", JSON.stringify([...cart, oneProduct]));
    notify();
  };

  return (
    <>
      <div className={styles["product-details"]}>
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
            {oneProduct.stock === 0 ? (
              <button className={styles["sin-stock-button"]} disabled={true}>
                SIN STOCK
              </button>
            ) : (
              <button
                className={styles["add-to-cart-button"]}
                onClick={handleClick}
              >
                AÑADIR AL CARRITO
              </button>
            )}
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
        <div className={styles["button-return-container"]}>
          <Link
            to={"/"}
            className={`${styles.noDecoration} ${styles["button-return"]}`}
          >
            VOLVER
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
