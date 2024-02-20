import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  orderPokemonsAlphabetically,
  getUser,
  filterPokemonsTypes,
  orderPokemonsAttack,
  filterPokemonsOrigin,
  resetFilters
} from "../../redux/actions";

import "./filters.styles.css";

const OrderFilter = ({ order, setOrder, initialLoad }) => {
  const dispatch = useDispatch();
  const [typesList, setTypesList] = useState([]);
  const [filters, setFilters] = useState({
    orderByName: "DEFAULT",
    origin: "DEFAULT",
    types: "DEFAULT",
    attack: "DEFAULT",
  });

  useEffect(() => {
    if (initialLoad) {
      // Si es la carga inicial, obtén los Pokémon con el orden por defecto ('A' en este caso)
      dispatch(getUser("A"));
      const fetchTypes = async () => {
        try {
          const response = await axios.get("http://localhost:3001/types");
          setTypesList(response.data.types);
        } catch (error) {
          console.error("Error al obtener la lista de tipos", error);
        }
      };

      fetchTypes();
    } else {
      // Si no es la carga inicial, verifica el orden actual y ordena en consecuencia
      if (order === "F" || order === "D") {
        dispatch(orderPokemonsAlphabetically(order));
      } else if (order === "AA" || order === "DA") {
        dispatch(orderPokemonsAttack("A"));
      } else if (order === "AD" || order === "DD") {
        dispatch(orderPokemonsAttack("D"));
      }
    }
  }, [dispatch, order, initialLoad]);

  const handleOrderChange = (e) => {
    setFilters({ ...filters, orderByName: e.target.value });
    dispatch(orderPokemonsAlphabetically(e.target.value));
  };

  const handleGenreChange = (e) => {
    setFilters({ ...filters, types: e.target.value });
    dispatch(filterPokemonsTypes(e.target.value));
  };

  const handleRatingChange = (e) => {
    setFilters({ ...filters, attack: e.target.value });
    dispatch(orderPokemonsAttack(e.target.value));
  };

  const handleOriginChange = (e) => {
    setFilters({ ...filters, origin: e.target.value });
    dispatch(filterPokemonsOrigin(e.target.value));
  };

  const handleResetFilters = () => {
    setFilters({
      orderByName: "DEFAULT",
      origin: "DEFAULT",
      types: "DEFAULT",
      attack: "DEFAULT",
    });
    dispatch(resetFilters());
  };

  return (
    <div className="order-buttons">
      <label>NOMBRE</label>
      <select
        name="orderByName"
        onChange={handleOrderChange}
        value={filters.orderByName}
      >
        <option value="DEFAULT" disabled hidden>
          --
        </option>
        <option value="F">ASCENDING</option>
        <option value="D">DESCENDING</option>
      </select>

      <label>ORIGEN</label>
      <select
        name="origin"
        value={filters.origin}
        onChange={handleOriginChange}
      >
        <option value="DEFAULT" disabled hidden>
          --
        </option>
        <option value="A">API</option>
        <option value="B">CREATED</option>
      </select>

      <label>TYPES</label>
      <select name="genders" value={filters.types} onChange={handleGenreChange}>
        <option value="DEFAULT" disabled hidden>
          --
        </option>
        {typesList.map((type, index) => (
          <option key={index} value={type}>
            {type.toUpperCase()}
          </option>
        ))}
      </select>

      <label>ATTACK</label>
      <select
        name="attack"
        value={filters.attack}
        onChange={handleRatingChange}
      >
        <option value="DEFAULT" disabled hidden>
          --
        </option>
        <option value="H">LOW ATTACK</option>
        <option value="L">HIGH ATTACK</option>
      </select>

      <button onClick={handleResetFilters} className="limpiarFiltros"><img src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif" alt="" className="limpiarFiltros-icon"/>Limpiar filtros</button>
    </div>
  );
};

export default OrderFilter