// Detail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './detail.styles.css';

function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  // Dentro de tu componente Detail
const [animateAttackBar, setAnimateAttackBar] = useState(false);



  useEffect(() => {
    axios(`http://localhost:3001/pokemons/${id}`)
      .then(({ data }) => {
        if (data.name) {
          // Normaliza el ataque al rango de   1 a   100
          const normalizedAttack = Math.max(1, Math.min(100, data.attack));
          setCharacter({ ...data, attack: normalizedAttack });
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
  
  // Dentro de tu componente Detail
const [animateHpBar, setAnimateHpBar] = useState(false);

useEffect(() => {
  // Suponiendo que 'character.hp' cambia y deseas animar la barra de progreso
  setAnimateHpBar(true); // Activa la animación
  const timer = setTimeout(() => {
    setAnimateHpBar(false); // Desactiva la animación después de un tiempo
  },  500); // Ajusta este tiempo según la duración de tu animación

  return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
}, [character.hp]); // Actualiza la animación cuando 'character.hp' cambie

useEffect(() => {
  setAnimateAttackBar(true); // Activa la animación
  const timer = setTimeout(() => {
    setAnimateAttackBar(false); // Desactiva la animación después de un tiempo
  },  500); // Ajusta este tiempo según la duración de tu animación

  return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
}, [character.attack]); // Actualiza la animación cuando 'character.attack' cambie


function addDynamicHPAnimation(hpPercentage) {
  // Obtén la hoja de estilos dinámica o crea una nueva si no existe
  let dynamicStyles = document.getElementById('dynamic-styles');
  if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.id = 'dynamic-styles';
    document.head.appendChild(dynamicStyles);
  }

  // Crea la regla de animación con el porcentaje de HP específico
  const animationKeyframes = `
    @keyframes fillHPBar {
      from {
        width:   0%;
      }
      to {
        width: ${hpPercentage}%;
      }
    }
  `;

  // Agrega la regla de animación a la hoja de estilos
  dynamicStyles.sheet.insertRule(animationKeyframes,   0);
}
useEffect(() => {
  if (character.hp) {
    // Llama a la función para agregar la animación dinámica
    addDynamicHPAnimation(character.hp);
  }
}, [character.hp]); // Dependencia en character.hp




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
            <h4>hp</h4>
            <div className="hp-bar">
               <div className={`hp-value ${animateHpBar ? 'animate' : ''}`} style={{ width: `${character.hp}%` }}></div>
                 <span className="hp-number">{character.hp}</span>
            </div>

            {/* <h2> hp: {character.hp || character.life}</h2> */}
            {/* <h2>ataque: {character.attack}</h2> */}
            <h4>ataque</h4>
            <div className="attack-bar">
            <div className={`attack-value ${animateAttackBar ? 'animate' : ''}`} style={{ width: `${character.attack}%` }}></div>
            <span className="attack-number">{character.attack}</span>
           </div>

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
