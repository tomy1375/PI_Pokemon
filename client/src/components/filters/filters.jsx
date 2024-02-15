// filters/OrderFilter.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { orderPokemonsAlphabetically, orderPokemonsAttack } from '../../redux/actions';

import "./filters.styles.css"

const OrderFilter = ({ order, setOrder, initialLoad }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialLoad) {
      if (order === 'A' || order === 'D') {
        // Si el orden actual es alfabético, ordenar alfabéticamente
        dispatch(orderPokemonsAlphabetically(order));
      } else if (order === 'AA' || order === 'DA') {
        // Si el orden actual es ascendente por ataque, ordenar por ataque ascendente
        dispatch(orderPokemonsAttack('A'));
      } else if (order === 'AD' || order === 'DD') {
        // Si el orden actual es descendente por ataque, ordenar por ataque descendente
        dispatch(orderPokemonsAttack('D'));
      }
    }
  }, [dispatch, order, initialLoad]);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
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
