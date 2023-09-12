import styles from "./purchase_info.module.scss";

const Purchase_info = () => {
  return (
    <section className={styles["purchaseInfo"]}>
      <div className={styles["purchaseInfo-wrapper"]}>
        <article className={styles["purchaseInfo-container"]}>
          <i className="fas fa-tag"></i>
          <h2 className={styles["purchaseInfo-title"]}>3 CUOTAS SIN INTERÉS</h2>
          <p className={styles["purchaseInfo-text"]}>CON TODAS LAS TARJETAS</p>
        </article>
        <article
          className={`${styles["purchaseInfo-container"]} ${styles["purchaseInfo-container-border"]}`}
        >
          <i className="fas fa-lock"></i>
          <h2 className={styles["purchaseInfo-title"]}>
            MÁS DE 100.000 VENTAS
          </h2>
          <p className={styles["purchaseInfo-text"]}>
            CONTAMOS CON UN LARGO HISTORIAL EN VENTAS ONLINE A TODO EL MUNDO
          </p>
        </article>
        <article className={styles["purchaseInfo-container"]}>
          <i className="fas fa-truck"></i>
          <h2 className={styles["purchaseInfo-title"]}>
            ENVÍOS A TODO EL PAÍS
          </h2>
          <p className={styles["purchaseInfo-text"]}>
            ENVIO GRATIS SUPERANDO LOS $25.000
          </p>
        </article>
      </div>
    </section>
  );
};

export default Purchase_info;
