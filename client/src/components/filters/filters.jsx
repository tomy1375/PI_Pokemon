import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderPokemonsAlphabetically, orderPokemonsAttack, getUser, filterPokemonsTypes, filterPokemonsOrigin } from '../../redux/actions';

import "./filters.styles.css";

const OrderFilter = ({ order, setOrder, initialLoad }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState('');
  const [allTypes, setAllTypes] = useState([]);

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
      } else if (order === 'A' || order === 'C') {
        dispatch(filterPokemonsOrigin(order));
      }
    }
    
    const typesFromAPI = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy", "unknown", "shadow"];
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
    } else if (newOrder === 'Filtrar por API') { 
      dispatch(filterPokemonsOrigin('A'));
    } else if (newOrder === 'Filtrar por Creado') { 
      dispatch(filterPokemonsOrigin('C'));
    }
  };

  const handleTypeChange = (event) => {
    const newType = event.target.value;

    if (newType === selectedType) {
      // Si se selecciona nuevamente el tipo existente, no realizar ninguna acción adicional
      return;
    }

    setSelectedType(newType);

    if (newType) {
      dispatch(filterPokemonsTypes(newType));
    } else {
      // Si se selecciona "Seleccionar Tipo", mostrar todos los tipos
      setAllTypes(["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy", "unknown", "shadow"]);
    }
  };

  const handleOriginFilterChange = (event) => {
    const selectedFilter = event.target.value;
    handleOrderChange(selectedFilter);
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
      <select value={order} onChange={handleOriginFilterChange}>
        <option value="Filtrar por API">Filtrar por API</option>
        <option value="Filtrar por Creado">Filtrar por Creados</option>
      </select>
    </div>
  );
};

export default OrderFilter;
