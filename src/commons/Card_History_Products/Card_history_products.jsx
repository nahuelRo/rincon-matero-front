import React from "react";
import styles from "./card_history_products.module.scss";

const CardHistory = ({ order }) => {
  const totalPrice = order.products.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <h2 className={styles.title}>Orden #{order.orderId}</h2>
        <p className={styles.status}>Estado: {order.status}</p>

        <p className={styles.date}>
          Fecha de compra: {order.purchaseDate.slice(0, 10)}
        </p>

        <div className={styles.productsContainer}>
          {order.products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <img
                className={styles.productImage}
                src={product.image}
                alt={product.name}
              />
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>
                Precio: ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <p className={styles.price}>Precio total: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CardHistory;
