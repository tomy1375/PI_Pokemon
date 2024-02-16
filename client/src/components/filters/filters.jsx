// components/filters/OrderFilter.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { orderPokemonsAlphabetically, orderPokemonsAttack, getUser } from '../../redux/actions';

import "./filters.styles.css"

const OrderFilter = ({ order, setOrder, initialLoad }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialLoad) {
      // Si es la carga inicial, obtén los Pokémon con el orden por defecto ('A' en este caso)
      dispatch(getUser('A'));
    } else {
      // Si no es la carga inicial, verifica el orden actual y ordena en consecuencia
      if (order === 'A' || order === 'D') {
        dispatch(orderPokemonsAlphabetically(order));
      } else if (order === 'AA' || order === 'DA') {
        dispatch(orderPokemonsAttack('A'));
      } else if (order === 'AD' || order === 'DD') {
        dispatch(orderPokemonsAttack('D'));
      }
    }
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
    </div>
  );
};

export default OrderFilter;

