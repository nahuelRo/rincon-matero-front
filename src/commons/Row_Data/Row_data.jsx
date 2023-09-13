import { useState } from "react";
import styles from "./row_data.module.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Row_data = ({ handleDelete, product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.category.name}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>

      <td>
        <div>
          <button>...</button>
          <div>
            <Link to={`/panel-edit/products/${product.id}`}>
              <button>Editar</button>
            </Link>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Row_data;
