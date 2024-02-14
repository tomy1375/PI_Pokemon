import './about.styles.css';
import React from 'react';

function About() {
  return (
    <div className="card-container">
      <h2 className="blue-heading">Acerca de mí</h2>
      <p>Soy un músico que decidió incursionar en la programación.</p>
      <div className="image-container">
      <img src="https://th.bing.com/th/id/OIG1.qV1LU9sxsHDmwLf57CKF?pid=ImgGn" alt="aboout i" />
      </div>
    </div>
  );
}

export default About;
