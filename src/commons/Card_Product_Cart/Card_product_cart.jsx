import React, { useState } from "react";
import styles from "./card_product_cart.module.scss";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({
  id,
  imageUrl,
  title,
  description,
  price,
  stock,
  setCart,
  cart,
  setChangeQuantity,
  changeQuantity,
}) => {
  const [quantity, setQuantity] = useState(() => {
    const carts = JSON.parse(localStorage.getItem("cart"));
    const filterCarts = carts.filter((item) => item.id === id);
    return filterCarts[0].quantity || 1;
  });

  const notify = (message) => toast.error(message);

  const handleClick = () => {
    setCart(() => {
      cart = cart.filter((item) => item.id !== id);

      localStorage.setItem("cart", JSON.stringify(cart));

      setChangeQuantity(!changeQuantity);

      return cart;
    });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const product = cart.filter((item) => item.id !== id);
      product.quantity = quantity;

      const filterCarts = cart.filter((item) => item.id === id);
      filterCarts[0].quantity = quantity - 1;

      localStorage.setItem("cart", JSON.stringify(cart));

      setChangeQuantity(!changeQuantity);
    } else {
      notify("No puedes reducir la cantidad por debajo de 1.");
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      const filterCarts = cart.filter((item) => item.id === id);
      filterCarts[0].quantity = quantity + 1;

      localStorage.setItem("cart", JSON.stringify(cart));

      setChangeQuantity(!changeQuantity);
    } else if (quantity >= stock) {
      notify("No hay suficiente stock.");
    }
  };

  return (
    <div className={styles["horizontal-card"]}>
      <img src={imageUrl} className={styles["product-image"]} alt={title} />
      <div className={styles["card-content"]}>
        <h5 className={styles["product-title"]}>{title}</h5>
        <p className={styles["product-description"]}>{description}</p>
        <p className={styles["product-price"]}>Precio: ${price}</p>
        <div className={styles["quantity-controls"]}>
          <button onClick={decrementQuantity}>-</button>
          <input type="text" value={quantity} readOnly />
          <button onClick={incrementQuantity}>+</button>
        </div>
        <p className={styles["product-stock"]}>Stock {stock} u.</p>
      </div>
      <i className="fa-solid fa-trash" onClick={handleClick}></i>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProductCard;
