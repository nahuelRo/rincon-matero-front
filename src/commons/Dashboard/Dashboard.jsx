import { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import axios from "axios";
import RowData from "../Row_Data/Row_data";

const Dashboard = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/products").then((res) => {
      setContent(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/products/${id}`).then((res) => {
      const deletedProduct = res.data;
      setContent(content.filter((item) => item.id !== deletedProduct.id));
    });
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <section>
      <header>
        <div>
          <h2>Añadir nuevo</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div>
          <button>boton</button>
        </div>
      </header>
      <article>
        <header>
          <h2>Todos los productos</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </header>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {content.map((product, index) => (
              <RowData
                key={index}
                handleDelete={handleDelete}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Dashboard;
