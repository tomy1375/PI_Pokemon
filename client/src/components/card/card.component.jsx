import { Link } from "react-router-dom";
import React from 'react';
import "./card.styles.css";

function Card({ user }) {
  const { name, image, types, id } = user;

  return (
    <div className='card-container'>
      <Link to={`/home/${id}`}>
        <img src={image} alt="" />
        <h2>{name}</h2>
        <div>
          {types.map((type, index) => (
            <p key={index}>{type}</p>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default Card;
