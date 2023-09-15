import { useState } from "react";
import styles from "./row_data.module.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Row_data = ({ handleDelete, item, name }) => {
  const confirmDelete = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el elemento?",
      text: "Esta acción también eliminará el registro de la base de datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(item.id);
      }
    });
  };

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

            <i className="fa-solid fa-trash" onClick={confirmDelete}></i>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Row_data;
