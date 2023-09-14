import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../commons/Input/Input";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const URL = `http://localhost:3001/api/products/search/:query`;
  const ShowData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  const searcher = (e) => {
    console.log(e.target);
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
    navigate(`/search-results?search=${search}`);
  };

  useEffect(() => {
    ShowData();
  }, []);

  return (
    <div>
      <Input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Buscar..."
        className="form-control"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
export default SearchBar;
