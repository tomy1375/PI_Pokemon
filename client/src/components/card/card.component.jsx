import {Link} from "react-router-dom"

import React from 'react'
import "./card.styles.css"

function Card({user}) {
  console.log(user)
  const {name, image, types, id} = user
  return (
    <div className='card-container'>
      <Link to={`/home/${id}`}>
      <img src={image} alt="" />
      <h2>{name}</h2>
      <p>{types}</p>
      </Link>
    </div>
  )
}

export default Card