import Card from "../commons/Card";
import fakeData from "../utils/fakeData";
import { Link } from "react-router-dom";

const Grid = () => {
  return (
    <section className="grid">
      {fakeData?.map((el, index) => (
        <Link to={"/productDetails/1"}>
          <Card key={index} data={el} />
        </Link>
      ))}
    </section>
  );
};

export default Grid;
