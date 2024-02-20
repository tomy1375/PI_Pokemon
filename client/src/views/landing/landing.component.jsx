import React from 'react';
import { useHistory } from 'react-router-dom';
import "./landing.styles.css";
const imagenLogo =  require("../landing/pokemonTitulo.png")

function Landing() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/home');
  };

  return (
    <div className="landing-container">
      <img
        className="img_landing"
        src="https://artfiles.alphacoders.com/160/160703.jpeg"
        alt=""
      />
      <div className="logo-container">
        <img
          className="logo-image"
          src={imagenLogo}
          alt="Pokemon Logo"
        />
      </div>
      <button className="buttonInicio" type="button" onClick={handleClick}>
       <h2>vamos</h2>
      </button>
      <img
        className="img_gif"
        src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif"
        alt="GIF Pikachu"
      />
    </div>
  );
}

export default Landing;
