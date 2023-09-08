/* eslint-disable react/prop-types */
const Card = ({ data }) => {
  return (
    <article className="card">
      <img className="card__image" src={data.image} alt={data.name} />
      <h2 className="card__title">{data.name}</h2>
      <p className="card__price">${data.price}</p>
    </article>
  );
};

export default Card;
