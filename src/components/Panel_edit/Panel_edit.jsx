import { useForm } from "react-hook-form";
import styles from "../Panel_edit/panel_edit.module.scss";
import Input from "../../commons/Input/Input";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Panel_edit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState({});
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setContent(res.data);
        initializeForm(res.data);
      });

    axios
      .get(`http://localhost:3001/api/categories`, { withCredentials: true })
      .then((res) => setCategories(res.data));
  }, []);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const initializeForm = (data) => {
    setValue("category", data?.category?.id.toString());
    setValue("itemName", data.name);
    setValue("description", data.description);
    setValue("price", data.price);
    setValue("stock", data.stock);
  };

  const onSubmit = (data) => {
    axios
      .put(
        `http://localhost:3001/api/products/${id}`,
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
        navigate("/panel-admin/products");
      })
      .catch((error) => console.log(error));
  };

  const handleClick = () => {
    navigate("/panel-admin/products");
  };

  const { name, id } = useParams();

  return (
    <section className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className={styles.form}
      >
        <header className={styles.header}>
          <h2 className={styles["header__title"]}>{`Editar productos`}</h2>
          <p className={styles["header__exit"]} onClick={handleClick}>
            X
          </p>
        </header>

        <hr className={styles.separator} />

        <div className={styles.fieldsWrapper}>
          <Input
            name="nombre"
            type="text"
            controller={register("itemName")}
            defaultValue={getValues("itemName")}
            errors={errors.name && errors.name.message}
          />

          <Input
            name="descripción"
            type="text"
            controller={register("description")}
            defaultValue={getValues("description")}
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
              defaultValue={getValues("price")}
            />

            <Input
              name="Stock"
              type="number"
              controller={register("stock")}
              defaultValue={getValues("stock")}
            />
          </div>
        </div>

        <hr className={styles.separator} />

        <button type="submit" className={styles.submit}>
          {isLoading ? "Loading" : "FINALIZAR EDICIÓN"}
        </button>
      </form>
    </section>
  );
};

export default Panel_edit;
