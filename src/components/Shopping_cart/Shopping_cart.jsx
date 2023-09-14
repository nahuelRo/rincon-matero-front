import { useSelector } from "react-redux";
import ProductCard from "../../commons/Card_Product_Cart/Card_product_cart";
import styles from "./Shopping_cart.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShoppingCart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const [changeQuantity, setChangeQuantity] = useState(false);

  useEffect(() => {
    setTotalPrice(() => {
      return cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    });
  }, [changeQuantity, cart]);

  const handleCheckout = async () => {
    try {
      if (totalPrice !== null) {
        const response = await axios.post(
          `http://localhost:3001/api/orders/user/${user.id}/checkout`,
          { total_price: totalPrice, items: cart },
          { withCredentials: true }
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: `Gracias ${user.name}, ¡Tu compra ha sido realizada!`,
          showConfirmButton: false,
          timer: 2500,
          backdrop: "transparent",
        }).then(() => {
          navigate("/");
        });

        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al realizar el checkout", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        {cart?.map((product, index) => (
          <div key={index}>
            <ProductCard
              cart={cart}
              setCart={setCart}
              id={product.id}
              imageUrl={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              setChangeQuantity={setChangeQuantity}
              changeQuantity={changeQuantity}
            />
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2 className={styles.summaryHeadline}>Resumen de Compra</h2>
        <div className={styles.summaryItem}>Productos ({cart.length}):</div>
        <div className={styles.summaryTotal}>
          Total:
          <span className={styles.summaryPrice}>{totalPrice}</span>
        </div>
        <Link to={user.name ? "/checkout" : "/login"}>
          <button
            className={styles.buttonCheckout}
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
