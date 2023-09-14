import { useState } from "react";
import styles from "./row_data.module.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Row_data = ({ handleDelete, item, name }) => {
  return (
    <tr>
      {!item.price ? (
        <>
          <td>{item.name}</td>
          <td>{item.description}</td>
        </>
      ) : (
        <>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.category.name}</td>
          <td>{item.price}</td>
          <td>{item.stock}</td>
        </>
      )}

      <td>
        <div>
          <div className={styles.icons}>
            <Link to={`/panel-edit/${name}/${item.id}`}>
              <i className="fa-solid fa-pencil"></i>
            </Link>

            <i
              className="fa-solid fa-trash"
              onClick={() => handleDelete(item.id)}
            ></i>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Row_data;
