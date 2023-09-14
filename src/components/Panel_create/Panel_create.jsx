import { useForm } from "react-hook-form";
import styles from "../Panel_edit/panel_edit.module.scss";
import Input from "../../commons/Input/Input";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Panel_edit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const { name } = useParams();

  useEffect(() => {
    if (name === "products") {
      axios
        .get(`http://localhost:3001/api/categories`, { withCredentials: true })
        .then((res) => setCategories(res.data));
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (name === "products") {
      axios
        .post(
          "http://localhost:3001/api/products",
          {
            image:
              "https://www.carsaludable.com.ar/wp-content/uploads/2014/03/default-placeholder.png",
            name: data.itemName,
            description: data.description,
            price: data.price,
            categoryId: data.category,
            stock: data.stock,
          },
          { withCredentials: true }
        )
        .then(() => navigate("/panel-admin/products"));
    } else {
      axios
        .post(
          "http://localhost:3001/api/categories",
          {
            name: data.itemName,
            description: data.description,
          },
          { withCredentials: true }
        )
        .then(() => navigate("/panel-admin/categories"));
    }
  };

  const handleClick = () => {
    navigate(`/panel-admin/${name}`);
  };

  return (
    <section className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={styles.form}
      >
        <header className={styles.header}>
          <h2 className={styles["header__title"]}>
            Crear {name === "categories" ? "Categorias" : "Productos"}
          </h2>
          <p className={styles["header__exit"]} onClick={handleClick}>
            X
          </p>
        </header>

        <hr className={styles.separator} />

        <div className={styles.fieldsWrapper}>
          {name === "categories" ? (
            <>
              <Input
                name="nombre"
                type="text"
                controller={register("itemName")}
                errors={errors.name && errors.name.message}
              />

              <Input
                name="descripción"
                type="text"
                controller={register("description")}
                errors={errors.last_name && errors.last_name.message}
              />
            </>
          ) : (
            <>
              <Input
                name="nombre"
                type="text"
                controller={register("itemName")}
                errors={errors.name && errors.name.message}
              />
              <Input
                name="descripción"
                type="text"
                controller={register("description")}
                errors={errors.last_name && errors.last_name.message}
              />
              <label htmlFor="category">Categorias:</label>
              <select {...register("category")}>
                {categories?.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className={styles.twofields}>
                <Input
                  name="precio"
                  type="number"
                  controller={register("price")}
                />

                <Input
                  name="Stock"
                  type="number"
                  controller={register("stock")}
                />
              </div>
            </>
          )}
        </div>

        <hr className={styles.separator} />

        <button type="submit" className={styles.submit}>
          {isLoading ? "Loading" : "Crear"}
        </button>
      </form>
    </section>
  );
};

export default Panel_edit;
