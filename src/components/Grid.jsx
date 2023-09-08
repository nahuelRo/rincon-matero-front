import Card from "../commons/Card";
import fakeData from "../utils/fakeData";

const Grid = () => {
  return (
    <section className="grid">
      {fakeData?.map((el, index) => (
        <Card key={index} data={el} />
      ))}
    </section>
  );
};

export default Grid;
