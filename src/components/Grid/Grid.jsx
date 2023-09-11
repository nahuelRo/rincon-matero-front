import styles from "./grid.module.scss";
import Card from "../../commons/Card/Card";
import fakeData from "../../utils/fakeData";
import { Link } from "react-router-dom";

const Grid = () => {
  return (
    <section className={styles.grid}>
      {fakeData?.map((el, index) => (
        <Link key={index} to={"/productDetails/1"}>
          <Card data={el} />
        </Link>
      ))}
    </section>
  );
};

export default Grid;
