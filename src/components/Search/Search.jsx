import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./search.module.scss";
import axios from "axios";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const searcher = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    performRealTimeSearch(searchTerm);
  };

  const handleClick = () => {
    setSearch("");
    setFilteredProducts([]);
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/products")
  //     .then((res) => {
  //       setProducts(res.data);
  //     })
  //     .catch(() => {});
  // }, []);

  const performRealTimeSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/products/search/${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setFilteredProducts(data);
      } else {
        console.error("Error al buscar productos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   navigate(`/search?q=${search}`);
  // };

  return (
    <div>
      <div className={styles["search-bar"]}>
        <div className={styles["wrap"]}>
          <div className={styles["search"]}>
            <input
              type="text"
              onChange={searcher}
              value={search}
              className={styles["searchTerm"]}
              placeholder="Buscar..."
            />
            <button type="submit" className={styles["searchButton"]}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      {filteredProducts.length > 0 && (
        <div className={styles["search-results"]}>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleClick}
                  to={`/product/${product.id}`}
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
