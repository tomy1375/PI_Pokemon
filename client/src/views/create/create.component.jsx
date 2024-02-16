import React, { useState, useEffect } from 'react';
import './create.styles.css';
import axios from 'axios';
import { validation } from './validation';

function Create() {
  const initialInputState = {
    name: '',
    life: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: '',
    types: [],
  };

  const [input, setInput] = useState(initialInputState);
  const [errors, setErrors] = useState({
    name: 'Nombre es requerido',
    life: 'Vida es requerida',
    attack: 'Ataque es requerido',
    defense: 'Defensa es requerida',
    speed: 'Velocidad es requerida',
    height: 'Altura es requerida',
    weight: 'Peso es requerido',
    image: 'Imagen es requerida',
  });
  const [completedFields, setCompletedFields] = useState({
    name: false,
    life: false,
    attack: false,
    defense: false,
    speed: false,
    height: false,
    weight: false,
    image: false,
    types: false,
  });
  const [typesList, setTypesList] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/types');
        setTypesList(response.data.types);
      } catch (error) {
        console.error('Error al obtener la lista de tipos', error);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    const validationError = validation({ ...input, [name]: value });
    setErrors({ ...errors, [name]: validationError[name] });
    setCompletedFields({ ...completedFields, [name]: !validationError[name] });
  };

  const handleTypesChange = (selectedTypes) => {
    setInput({ ...input, types: selectedTypes });
    setCompletedFields({ ...completedFields, types: selectedTypes.length > 0 });
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const handleAddType = () => {
    if (selectedType && !input.types.includes(selectedType)) {
      const updatedTypes = [...input.types, selectedType];
      setInput({ ...input, types: updatedTypes });
      setCompletedFields({ ...completedFields, types: updatedTypes.length > 0 });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validation(input);
    setErrors(validationErrors);
  
    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        const response = await axios.post('http://localhost:3001/pokemons', input);
  
        if (response.status === 200) {
          const pokemonName = input.name;
          alert(`¡Pokémon ${pokemonName} creado con éxito!`);
          setInput(initialInputState);
          setCompletedFields({
            name: false,
            life: false,
            attack: false,
            defense: false,
            speed: false,
            height: false,
            weight: false,
            image: false,
            types: false,
          });
        } else {
          console.error('Error al crear Pokémon');
        }
      } catch (error) {
        console.error('Error de red al crear Pokémon', error);
      }
    } else {
      console.log('Corrige los errores antes de enviar el formulario.');
      console.log(validationErrors); // Agrega esta línea para imprimir los errores en la consola
    }
  };
  
  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <div>
        <br /><br /><br /><br />
        <label> Imagen (URL) </label>
        <input type="text" name="image" value={input.image} onChange={handleChange} />
        {completedFields.image && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.image}</span>
        {input.image && <img src={input.image} alt="Imagen previa" style={{ maxWidth: '200px', marginTop: '10px' }} />}
      </div>
      <div>
        <label> Nombre </label>
        <input name="name" value={input.name} onChange={handleChange} />
        {completedFields.name && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.name}</span>
      </div>
      <div>
        <label> Vida </label>
        <input name="life" value={input.life} onChange={handleChange} />
        {completedFields.life && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.life}</span>
      </div>
      <div>
        <label> Ataque </label>
        <input name="attack" value={input.attack} onChange={handleChange} />
        {completedFields.attack && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.attack}</span>
      </div>
      <div>
        <label> Defensa </label>
        <input name="defense" value={input.defense} onChange={handleChange} />
        {completedFields.defense && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.defense}</span>
      </div>
      <div>
        <label> Velocidad </label>
        <input name="speed" value={input.speed} onChange={handleChange} />
        {completedFields.speed && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.speed}</span>
      </div>
      <div>
        <label> Altura </label>
        <input name="height" value={input.height} onChange={handleChange} />
        {completedFields.height && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.height}</span>
      </div>
      <div>
        <label> Peso </label>
        <input name="weight" value={input.weight} onChange={handleChange} />
        {completedFields.weight && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.weight}</span>
      </div>
      <div>
        <label> Tipos </label>
        <button type="button" onClick={() => handleTypesChange([])}>
          Limpiar Tipos
        </button>
        <div className="types-bubbles">
          {typesList.map((type) => (
            <div
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`type-bubble ${selectedType === type ? 'selected' : ''}`}
            >
              {type}
            </div>
          ))}
        </div>
        <div>
          <button type="button" onClick={() => handleAddType()}>
            Agregar Tipo
          </button>
          {input.types.map((type) => (
            <span key={type} style={{ margin: '0 5px' }}>
              {type}
            </span>
          ))}
        </div>
        {completedFields.types && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.types}</span>
      </div>
        {completedFields.types && <span style={{ color: 'green' }}>✅</span>}
        <span>{errors.types}</span>
      
      {Object.values(errors).every((error) => !error) && (
        <button type="submit">Crear Pokémon</button>
      )}
    </form>
  );
}

export default Create;
