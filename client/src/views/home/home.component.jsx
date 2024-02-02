import React from 'react'
import Navbar from '../../components/navbar/navbar.component'
import Cards from '../../components/cards/cards.component'

import "./home.styles.css"

function Home() {
  return (
    <div className='home'>
        <h2 className='home-title'>Home</h2>
        <Navbar/>
        <Cards/>
    </div>
  )
}

export default Home