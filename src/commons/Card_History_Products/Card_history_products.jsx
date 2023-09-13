import React from "react";
import styles from "./card_history_products.module.scss";

const CardHistory = ({ order }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={order?.products[0]?.image}
          alt="Product"
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>Order #{order.orderId}</h2>
        <p className={styles.status}>Status: {order.status}</p>
        <p className={styles.date}>Purchase Date: {order.purchaseDate}</p>
        <p className={styles.price}>Total Price: ${order.total_price}</p>
      </div>
    </div>
  );
};

export default CardHistory;
