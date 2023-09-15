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
  const { name, id } = useParams();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/${name}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        initializeForm(res.data);
      });
    if (name === "products") {
      axios
        .get(`http://localhost:3001/api/categories`, { withCredentials: true })
        .then((res) => setCategories(res.data));
    }
  }, []);

  const initializeForm = (data) => {
    if (name === "products") {
      setValue("category", data?.category?.id.toString());
      setValue("itemName", data.name);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("stock", data.stock);
    } else {
      setValue("itemName", data.name);
      setValue("description", data.description);
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .put(
        `http://localhost:3001/api/${name}/${id}`,
        {
          name: data.itemName,
          description: data.description,
          price: data.price,
          stock: data.stock,
          categoryId: data.category,
        },
        { withCredentials: true }
      )
      .then(() => {
        setIsLoading(false);
        navigate(`/panel-admin/${name}`);
      })
      .catch(() => {
        setIsLoading(false);
      });
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
          <h2 className={styles["header__title"]}>{`Editar producto`}</h2>
          <p className={styles["header__exit"]} onClick={handleClick}>
            X
          </p>
        </header>

        <hr className={styles.separator} />

        {name === "categories" ? (
          <>
            <div className={styles.fieldsWrapper}>
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
                defaultValue={getValues("itemName")}
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
                defaultValue={getValues("description")}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.fieldsWrapper}>
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
                defaultValue={getValues("itemName")}
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
                defaultValue={getValues("description")}
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
                  controller={register("price", {
                    required: {
                      value: true,
                      message: "Precio es requerido",
                    },
                  })}
                  errors={errors.price && errors.price.message}
                  defaultValue={getValues("price")}
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
                  defaultValue={getValues("stock")}
                />
              </div>
            </div>
          </>
        )}

        <hr className={styles.separator} />

        <button type="submit" className={styles.submit}>
          {isLoading ? (
            <span className={styles["loader"]}></span>
          ) : (
            "FINALIZAR EDICIÓN"
          )}
        </button>
      </form>
    </section>
  );
};

export default Panel_edit;
