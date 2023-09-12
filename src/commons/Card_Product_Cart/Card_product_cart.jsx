import { useState } from "react";
import styles from "./card_product_cart.scss";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../state/cartReducer";

const ProductCard = ({ id, imageUrl, title, description, price, stock }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeFromCart(id));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
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
      <i className="fa-solid fa-trash" onClick={handleClick}></i>
    </div>
  );
};

export default ProductCard;
