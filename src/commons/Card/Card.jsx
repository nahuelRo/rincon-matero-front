import styles from "./card.module.scss";

/* eslint-disable react/prop-types */
const Card = ({ data }) => {
  return (
    <article className={styles.card}>
      <div className={styles["card__image-container"]}>
        <img
          className={styles["card__image"]}
          src={data.image}
          alt={data.name}
        />
      </div>
      <h2 className={styles["card__title"]}>{data.name}</h2>
      <p className={styles["card__price"]}>${data.price}</p>
    </article>
  );
};

export default Card;
