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

  function handleChange(e) {
    e.preventDefault()
    setSearchString(e.target.value)
  }
  //filtro con el backend

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getByName(searchString))
  }


  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // const [filtered, setFiltered] = useState(allUsers);

  // function handleChange(e) {
  //   setSearchString(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const filteredUsers = allUsers.filter((user) =>
  //     user.name.toLowerCase().includes(searchString.toLowerCase())
  //   );
  //   setFiltered(filteredUsers);
  // }

  return (
    <div className='home'>
      <h2 className='home-title'>Home</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allUsers={allUsers} />
    </div>
  );
}

export default Home;
