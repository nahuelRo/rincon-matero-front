import styles from "./grid.module.scss";
import Card from "../../commons/Card/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Grid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className={styles.grid} id="scroll">
      {products?.map((el, index) => (
        <Link
          key={index}
          to={`/product/${el.id}`}
          className={styles.noDecoration}
        >
          <Card data={el} />
        </Link>
      ))}
    </section>
  );
};

export default Grid;
