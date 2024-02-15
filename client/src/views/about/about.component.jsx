import React from 'react';
import './about.styles.css';

function About() {
  return (
    <div className="center-container">
      <div className="card">
        <h2>Acerca de mí</h2>
        <p>Soy un músico que decidió incursionar en la programación.</p>
        <div className="image-container">
          <img src="https://th.bing.com/th/id/OIG1.qV1LU9sxsHDmwLf57CKF?pid=ImgGn" alt="about me" />
        </div>
      </div>
    </div>
  );
}

export default About;
