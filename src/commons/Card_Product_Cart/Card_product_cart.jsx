/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./card_product_cart.scss";

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
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      const filterCarts = cart.filter((item) => item.id === id);
      filterCarts[0].quantity = quantity + 1;

      localStorage.setItem("cart", JSON.stringify(cart));

      setChangeQuantity(!changeQuantity);
    }
  };

  return (
    <div className={"horizontal-card"}>
      <img src={imageUrl} className="product-image" alt={title} />
      <div className="card-content">
        <h5 className="product-title">{title}</h5>
        <p className="product-description">{description}</p>
        <p className="product-price">Precio: ${price}</p>
        <div className="quantity-controls">
          <button onClick={decrementQuantity}>-</button>
          <input type="text" value={quantity} readOnly />
          <button onClick={incrementQuantity} disabled={quantity === stock}>
            +
          </button>
        </div>
        <p className="product-stock">Stock {stock} u.</p>
      </div>
      <i className="fa-solid fa-trash" onClick={handleClick}></i>
    </div>
  );
};

export default ProductCard;
