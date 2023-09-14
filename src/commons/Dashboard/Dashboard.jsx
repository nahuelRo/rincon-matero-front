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
    axios.delete(`http://localhost:3001/api/${name}/${id}`).then((res) => {
      const deletedProduct = res.data;
      setContent(content.filter((item) => item.id !== deletedProduct.id));
    });
  };

  return (
    <section>
      <header>
        <div>
          <h2>Añadir nuevo</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div>
          <Link to="/panel-create">
            <button>+</button>
          </Link>
        </div>
      </header>
      <article>
        <header>
          <h2>Todos los productos {}</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </header>
        <table>
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
