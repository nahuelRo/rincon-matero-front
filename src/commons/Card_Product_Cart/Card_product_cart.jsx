import React, { useState } from "react";
import styles from "./card_product_cart.scss";

const ProductCard = ({ imageUrl, title, description, price, stock }) => {
  const [quantity, setQuantity] = useState(0);

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
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
      <i class="fa-solid fa-trash"></i>
    </div>
  );
};

export default ProductCard;
