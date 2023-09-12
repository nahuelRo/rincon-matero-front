import React from "react";
import ProductCard from "../../commons/Card_Product_Cart/Card_product_cart";
import fakeDataII from "../../utils/fakeDataII";
import styles from "./Shopping_cart.module.scss";

const ShoppingCart = ({ cartItems }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        {fakeDataII.map((product, index) => (
          <div key={index}>
            <ProductCard
              imageUrl={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
            />
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2 className={styles.summaryHeadline}>Resumen de Compra</h2>
        <div className={styles.summaryItem}>
          Productos ({fakeDataII.length}):
          <span className={styles.summaryPrice}>
            {fakeDataII
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryTotal}>
          Total:
          <span className={styles.summaryPrice}>
            {fakeDataII
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}
          </span>
        </div>
        <button className={styles.buttonCheckout}>CHECKOUT</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
{
  /* <div className={styles["shopping-cart"]}>
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p className={styles["empty-cart-message"]}>
          El carrito de compras está vacío
        </p>
      ) : (
        <div className={styles["cart-items"]}>
          {items.map((item, index) => (
            // Item
            <div className={styles["cart-item"]} key={index}>
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                className={styles["cart-button"]}
                onClick={() => removeFromCart(index)}
              >
                -
              </button>
              <span>Cantidad: 1</span>
              <button
                className={styles["cart-button"]}
                onClick={() => addToCart(item)}
              >import React from "react";
import ProductCard from "../../commons/Card_Product_Cart/Card_product_cart";
import fakeData from "../../utils/fakeData";
import styles from "./Shopping_cart.module.scss";

const ShoppingCart = ({ cartItems }) => {
  return (
    <div className="container">
      <h2>Products</h2>
      <div className={styles.productContainer}>
        {fakeData.map((product, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <ProductCard
              imageUrl={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
              lastUpdated={product.updatedAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;

{
  /* <div className={styles["shopping-cart"]}>
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p className={styles["empty-cart-message"]}>
          El carrito de compras está vacío
        </p>
      ) : (
        <div className={styles["cart-items"]}>
          {items.map((item, index) => (
            // Item
            <div className={styles["cart-item"]} key={index}>
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                className={styles["cart-button"]}
                onClick={() => removeFromCart(index)}
              >
                -
              </button>
              <span>Cantidad: 1</span>
              <button
                className={styles["cart-button"]}
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>
          ))}
          <p className={styles["cart-total"]}>Total: ${total}</p>
          <button
            className={styles["checkout-button"]}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}

      <div className={styles["cart-item"]}>
        <img src={exampleImage.image} style={smallImage} />
        <span>
          {exampleImage.name} - ${exampleImage.price}
        </span>
        <button
          className={styles["cart-button"]}
          onClick={() => addToCart(exampleImage)}
        >
          +
        </button>
      </div>
    </div> */
}
