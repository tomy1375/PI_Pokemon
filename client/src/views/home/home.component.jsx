import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getUser} from '../../redux/actions';
import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';
import OrderFilter from '../../components/filters/filters';

import './home.styles.css';

function Home() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('A');
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser(order));
      setInitialLoad(false);
      setCurrentPage(1);
    };

    fetchData();
  }, [dispatch, order]);

  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(searchString));
  };

  const itemsPerPage = 12;
  const totalUsers = allUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(i);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = allUsers.slice(startIndex, endIndex);

  return (
    <div className='home'>
    <h2 className='home-title'>Pokemons</h2>
    <OrderFilter order={order} setOrder={setOrder} initialLoad={initialLoad} />
    <Navbar handleChange={handleSearchChange} handleSubmit={handleSearchSubmit} />

    {initialLoad && (
      <div className="loading-container">
        {/* Puedes agregar aquí la imagen mientras se renderizan las cards */}
        <img
          src="https://giffiles.alphacoders.com/191/1918.gif"
          alt="Cargando Pokémon..."
        />
      </div>
      )}

        {allUsers.length === 0 && !initialLoad && searchString !== '' && (
     <div>
        <h2>No existe el pokemon "{searchString}"</h2>
       <img
           src="https://giffiles.alphacoders.com/154/15437.gif"
           alt="Imagen de Pokémon no encontrado"
           
        />
     </div>
      )}
      
      {allUsers.length > 0 && !initialLoad && (
        <Cards allUsers={displayedUsers} />
      )}

      <div className="pagination">
        {paginationButtons.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
