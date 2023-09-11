/* eslint-disable react/prop-types */
import styles from "./input.module.scss";

const Input = ({ name, type, controller, errors }) => {
  return (
    <div className={styles.field}>
      <div className={styles.wrapper}>
        <label htmlFor={name}>{name}</label>
        <input
          type={type}
          id={name}
          {...controller}
          className={`${styles["wrapper__input"]} ${errors && styles.error}`}
        />
      </div>

      {errors && <span>{errors}</span>}
    </div>
  );
};

export default Input;
