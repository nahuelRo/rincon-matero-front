import { useForm } from "react-hook-form";
import styles from "./panel_create.module.scss";
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
    setIsLoading(true);
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
        .then(() => {
          setIsLoading(false);
          navigate("/panel-admin/products");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error:", error);
        });
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
        .then(() => {
          setIsLoading(false);
          navigate("/panel-admin/categories");
        })
        .catch(() => {
          setIsLoading(false);
        });
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
                controller={register("itemName", {
                  required: { value: true, message: "Nombre es requerido" },
                  maxLength: {
                    value: 20,
                    message: "Debe tener como máximo 20 caracteres",
                  },
                })}
                errors={errors.itemName && errors.itemName.message}
              />

              <Input
                name="descripción"
                type="text"
                controller={register("description", {
                  required: {
                    value: true,
                    message: "Descripción es requerido",
                  },
                })}
                errors={errors.description && errors.description.message}
              />
            </>
          ) : (
            <>
              <Input
                name="nombre"
                type="text"
                controller={register("itemName", {
                  required: { value: true, message: "Nombre es requerido" },
                })}
                errors={errors.itemName && errors.itemName.message}
              />
              <Input
                name="descripción"
                type="text"
                controller={register("description", {
                  required: {
                    value: true,
                    message: "Descripción es requerido",
                  },
                })}
                errors={errors.description && errors.description.message}
              />

              <label htmlFor="category">Categorias:</label>
              <select
                {...register("category", {
                  required: { value: true, message: "Categoria requerida" },
                })}
                defaultValue=""
                className={errors.category && styles.error}
              >
                <option value="" disabled>
                  Selecciona una categoria
                </option>
                {categories?.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.category && <span>{errors.category.message}</span>}

              <div className={styles.twofields}>
                <Input
                  name="precio"
                  type="number"
                  controller={register("price", {
                    required: {
                      value: true,
                      message: "Precio es requerido",
                    },
                  })}
                  errors={errors.price && errors.price.message}
                />

                <Input
                  name="Stock"
                  type="number"
                  controller={register("stock", {
                    required: {
                      value: true,
                      message: "Stock es requerido",
                    },
                  })}
                  errors={errors.stock && errors.stock.message}
                />
              </div>
            </>
          )}
        </div>

        <hr className={styles.separator} />

        <button type="submit" className={styles.submit}>
          {isLoading ? <span className={styles["loader"]}></span> : "Crear"}
        </button>
      </form>
    </section>
  );
};

export default Panel_edit;
