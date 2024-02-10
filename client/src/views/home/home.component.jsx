import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getUser } from '../../redux/actions';
import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';
import './home.styles.css';

function Home() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
  }

  // Paginación
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
      <h2 className='home-title'>Home</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allUsers={displayedUsers} />

      {/* Paginación */}
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
