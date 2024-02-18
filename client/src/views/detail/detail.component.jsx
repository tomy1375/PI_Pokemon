// Detail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './detail.styles.css';

function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`http://localhost:3001/pokemons/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert('No personaje!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        window.alert('Error al obtener el personaje');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading-container">
          <img
            src="https://giffiles.alphacoders.com/191/1918.gif"
            alt="Loading GIF"
            className="loading-gif"
          />
        </div>
      ) : (
        <div className="card">
          <img src={character.image} alt="imagen pokemon" />
          <div className="card-info">
            <h1>{character.name}</h1>
            <h2> hp: {character.hp || character.life}</h2>
            <h2>ataque: {character.attack}</h2>
            <h2>defensa: {character.defense}</h2>
            <h2>velocidad: {character.speed}</h2>
            <h2>altura: {character.height}</h2>
            <h2>peso: {character.weight}</h2>
            <h2>tipo: {character.types.join(', ')}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
