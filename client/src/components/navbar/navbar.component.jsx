import React from 'react'
import "./navbar.styles.css"

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className='search-box'>
      <form onChange={handleChange}>
        <input placeholder='Busqueda' type='search'/>
        <button type='submit' onClick={handleSubmit}>Buscar</button>
      </form>
    </div>
  )
}

export default Navbar