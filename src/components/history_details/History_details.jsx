import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardHistory from "../../commons/Card_History_Products/Card_history_products";
import styles from "./history_details.module.scss";
import axios from "axios";

const HistoryDetails = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/orders/user/${id}/history`)
      .then((response) => {
        const groupedOrders = {};

        response.data.forEach((order) => {
          if (groupedOrders[order.orderId]) {
            groupedOrders[order.orderId].products.push(...order.products);
          } else {
            groupedOrders[order.orderId] = { ...order };
          }
        });

        const groupedOrdersArray = Object.values(groupedOrders);

        setOrders(groupedOrdersArray);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Mis compras</h1>
      <div className={styles.centeredContainer}>
        <div className={styles.cardContainer}>
          {orders.map((order) => (
            <CardHistory key={order.orderId} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
