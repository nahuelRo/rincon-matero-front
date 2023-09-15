/* eslint-disable react/prop-types */
import styles from "./grid.module.scss";
import Card from "../../commons/Card/Card";
import { Link } from "react-router-dom";

const Grid = ({ products }) => {
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
