import { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import axios from "axios";
import RowData from "../Row_Data/Row_data";
import { Link, useParams } from "react-router-dom";

const Dashboard = () => {
  const [content, setContent] = useState([]);

  const { name } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/${name}`).then((res) => {
      setContent(res.data);
    });
  }, [name]);

  // Alerta eliminar todos los productos de una categoria
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/${name}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const deletedProduct = res.data;
        setContent(content.filter((item) => item.id !== deletedProduct.id));
      });
  };

  return (
    <section className={styles.dashboard}>
      <header className={styles.header}>
        <h2>Añadir nuevo</h2>

        <Link to={`/panel-create/${name}`} className={styles.button}>
          <i className="fa-solid fa-plus"></i>
        </Link>
      </header>
      <article className={styles.container}>
        <h2 className={styles.header_title}>
          Todos {name === "products" ? "los productos" : "las categorias"}
        </h2>

        <table className={styles.table}>
          <thead>
            {name === "products" ? (
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            ) : (
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
              </tr>
            )}
          </thead>
          <tbody>
            {content.map((item, index) => (
              <RowData
                key={index}
                handleDelete={handleDelete}
                item={item}
                name={name}
              />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Dashboard;
