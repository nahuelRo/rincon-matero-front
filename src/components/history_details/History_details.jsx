import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardHistory from "../../commons/Card_History_Products/Card_history_products"; // Asegúrate de importar el componente correcto
import styles from "./history_details.module.scss";
import axios from "axios";

const HistoryDetails = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("IDDDDDDDDDDDDDDDDDDDDDDDDD:", id);
    axios
      .get(`http://localhost:3001/api/orders/user/${id}/history`) // Utiliza la variable id en lugar de 1
      .then((response) => {
        setOrders(response.data);
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
