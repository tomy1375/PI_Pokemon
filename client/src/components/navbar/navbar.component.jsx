// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

import "./navbar.styles.css"

const Navbar = ({ handleChange, handleSubmit }) => {
  return (
    <div className='navbar'>
      <div className='search-box'>
        <form onChange={handleChange}>
          <input placeholder='Busqueda' type='search' />
          <button type='submit' onClick={handleSubmit}>Buscar</button>
        </form>
      </div>
      <div className='nav-links'>
        <Link to="/create" className='nav-link'>
          <button>Crear Pokemon</button>
        </Link>
        <Link to="/home" className='nav-link'>
          <button>Home</button>
        </Link>
        <Link to="/about" className='nav-link'>
          <button>About</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
