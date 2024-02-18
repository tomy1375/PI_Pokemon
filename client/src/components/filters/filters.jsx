// components/filters/OrderFilter.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderPokemonsAlphabetically, orderPokemonsAttack, getUser, filterPokemonsTypes } from '../../redux/actions';

import "./filters.styles.css"

const OrderFilter = ({ order, setOrder, initialLoad }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState('');
  const [allTypes, setAllTypes] = useState([]);  // Nuevo estado para almacenar todos los tipos

  useEffect(() => {
    if (initialLoad) {
      dispatch(getUser('A'));
    } else {
      if (order === 'A' || order === 'D') {
        dispatch(orderPokemonsAlphabetically(order));
      } else if (order === 'AA' || order === 'DA') {
        dispatch(orderPokemonsAttack('A'));
      } else if (order === 'AD' || order === 'DD') {
        dispatch(orderPokemonsAttack('D'));
      }
    }
    const typesFromAPI = ["normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow"]; 
    setAllTypes(typesFromAPI);
  }, [dispatch, order, initialLoad]);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);

    if (newOrder === 'A' || newOrder === 'D') {
      dispatch(orderPokemonsAlphabetically(newOrder));
    } else if (newOrder === 'AA' || newOrder === 'DA') {
      dispatch(orderPokemonsAttack('A'));
    } else if (newOrder === 'AD' || newOrder === 'DD') {
      dispatch(orderPokemonsAttack('D'));
    }
  };

  const handleFilterByType = () => {
    if (selectedType) {
      dispatch(filterPokemonsTypes(selectedType));
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="order-buttons">
      <button onClick={() => handleOrderChange('A')} className={order === 'A' ? 'active' : ''}>
        Ordenar Alfabéticamente Ascendente
      </button>
      <button onClick={() => handleOrderChange('D')} className={order === 'D' ? 'active' : ''}>
        Ordenar Alfabéticamente Descendente
      </button>
      <button onClick={() => handleOrderChange('AA')} className={order === 'AA' ? 'active' : ''}>
        Ordenar por Ataque Ascendente
      </button>
      <button onClick={() => handleOrderChange('DA')} className={order === 'DA' ? 'active' : ''}>
        Ordenar por Ataque Descendente
      </button>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Seleccionar Tipo</option>
        {allTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button onClick={handleFilterByType}>
        Filtrar por Tipo
      </button>
    </div>
  );
};

export default OrderFilter;
