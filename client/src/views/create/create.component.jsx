import React, { useState } from 'react';
import './create.styles.css';
import axios from 'axios';

function Create() {
  const [input, setInput] = useState({
    name: '',
    life: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: null,
  });

  const [error, setError] = useState({
    name: '',
    life: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: '',
  });

  const validate = (input) => {
    const isNumericLife = /^[0-9]+$/.test(input.life);
    const isValidRangeLife = /^(0|[1-9][0-9]?|100)$/.test(input.life);

    const isNumericAttack = /^[0-9]+$/.test(input.attack);
    const isValidRangeAttack = /^(0|[1-9][0-9]?|100)$/.test(input.attack);

    const isNumericDefense = /^[0-9]+$/.test(input.defense);
    const isValidRangeDefense = /^(0|[1-9][0-9]?|100)$/.test(input.defense);

    const isNumericSpeed = /^[0-9]+$/.test(input.speed);
    const isValidRangeSpeed = /^(0|[1-9][0-9]?|100)$/.test(input.speed);

    const isNumericHeight = /^[0-9]+$/.test(input.height);
    const isValidRangeHeight = /^(0|[1-9][0-9]?|100)$/.test(input.height);

    const isNumericWeight = /^[0-9]+$/.test(input.weight);
    const isValidRangeWeight = /^(0|[1-9][0-9]?|100)$/.test(input.weight);

    const isValidImage = input.image ? '' : 'Debe seleccionar una imagen';

    const newErrors = {
      life: isNumericLife && isValidRangeLife ? '' : 'La vida debe ser un número válido entre 1 y 100',
      attack: isNumericAttack && isValidRangeAttack ? '' : 'El ataque debe ser un número válido entre 1 y 100',
      defense: isNumericDefense && isValidRangeDefense ? '' : 'La defensa debe ser un número válido entre 1 y 100',
      speed: isNumericSpeed && isValidRangeSpeed ? '' : 'La velocidad debe ser un número válido entre 1 y 100',
      height: isNumericHeight && isValidRangeHeight ? '' : 'La altura debe ser un número válido entre 1 y 100',
      weight: isNumericWeight && isValidRangeWeight ? '' : 'El peso debe ser un número válido entre 1 y 100',
      image: isValidImage,
    };

    setError({ ...error, ...newErrors });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setInput({ ...input, image: selectedImage });
    validate(input);
  };

  const HandleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    validate(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate(input);

    if (
      !error.life &&
      !error.attack &&
      !error.defense &&
      !error.name &&
      !error.speed &&
      !error.height &&
      !error.weight &&
      !error.image
    ) {
      try {
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('image', input.image);
        formData.append('life', input.life);
        formData.append('attack', input.attack);
        formData.append('defense', input.defense);
        formData.append('speed', input.speed);
        formData.append('height', input.height);
        formData.append('weight', input.weight);

        const response = await axios.post('http://localhost:3001/pokemons', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('¡Pokémon creado con éxito!');
          // Puedes redirigir a otra página o realizar acciones adicionales después de crear el Pokémon
        } else {
          console.error('Error al crear Pokémon');
        }
      } catch (error) {
        console.error('Error de red al crear Pokémon', error);
      }
    } else {
      console.log('Corrige los errores antes de enviar el formulario.');
    }
  };

  const imagePreview = input.image ? URL.createObjectURL(input.image) : null;

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <div>
        <label> Imagen </label>
        <input type="file" accept="image/*" name="image" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        <span>{error.image}</span>
      </div>
      <div>
        <label> Nombre </label>
        <input name="name" value={input.name} onChange={HandleChange} />
        <span>{error.name}</span>
      </div>
      <div>
        <label> Vida </label>
        <input name="life" value={input.life} onChange={HandleChange} />
        <span>{error.life}</span>
      </div>
      <div>
        <label> Ataque </label>
        <input name="attack" value={input.attack} onChange={HandleChange} />
        <span>{error.attack}</span>
      </div>
      <div>
        <label> Defensa </label>
        <input name="defense" value={input.defense} onChange={HandleChange} />
        <span>{error.defense}</span>
      </div>
      <div>
        <label> Velocidad </label>
        <input name="speed" value={input.speed} onChange={HandleChange} />
        <span>{error.speed}</span>
      </div>
      <div>
        <label> Altura </label>
        <input name="height" value={input.height} onChange={HandleChange} />
        <span>{error.height}</span>
      </div>
      <div>
        <label> Peso </label>
        <input name="weight" value={input.weight} onChange={HandleChange} />
        <span>{error.weight}</span>
      </div>
      {error.life || error.attack || error.defense || error.name || error.speed || error.height || error.weight ? null : (
        <button type="submit">Crear Pokémon</button>
      )}
    </form>
  );
}

export default Create;
