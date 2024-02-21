import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validation } from './validation';
import { useHistory } from 'react-router-dom'

import './create.styles.css';


function Create() {

  const history = useHistory();
  const initialInputState = {
    name: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  };

  const [input, setInput] = useState(initialInputState);
  const [errors, setErrors] = useState({
    name: "Nombre es requerido",
    life: "Vida es requerida",
    attack: "Ataque es requerido",
    defense: "Defensa es requerida",
    speed: "Velocidad es requerida",
    height: "Altura es requerida",
    weight: "Peso es requerido",
    image: "Imagen es requerida",
    
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
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/types");
        setTypesList(response.data.types);
      } catch (error) {
        console.error("Error al obtener la lista de tipos", error);
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
    // Toggle la selección del tipo
    if (input.types.includes(type)) {
      // Si ya está seleccionado, quítalo de la lista
      const updatedTypes = input.types.filter((t) => t !== type);
      setInput({ ...input, types: updatedTypes });
    } else {
      // Si no está seleccionado, agrégalo a la lista
      setInput({ ...input, types: [...input.types, type] });
    }
  
    // Agregar setSelectedType aquí si es necesario
    setSelectedType(type);
  };
  
  const isTypeSelected = (type) => {
    return input.types.includes(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validation(input);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        const response = await axios.post(
          "http://localhost:3001/pokemons",
          input
        );

        if (response.status === 200) {
          const pokemonName = input.name;
          alert(`Pokémon ${pokemonName} creado con éxito!`);

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
           history.push('/home');
        } else {
          console.error("Error al crear Pokémon");
        }
      } catch (error) {
        console.error("Error de red al crear Pokémon", error);
      }
    } else {
      console.log("Corrige los errores antes de enviar el formulario.");
      console.log(validationErrors); // Agrega esta línea para imprimir los errores en la consola
    }
  };

  return (
    <div className="create-container">

    <div className="form-container">
      <div className="info-box">
        <p>Para poner una imagen, sigue estos pasos:</p>
        <ol>
          <li>
            Paso 1: Ingresa la URL de la imagen en el campo "Imagen (URL)".
          </li>
          <li>
            Paso 2: Si la imagen no se muestra es porque estás ingresando
            incorrectamente la URL.
          </li>
          <li>
            Paso 3: Puedes probar haciendo clic derecho sobre la imagen y
            seleccionar "Abrir imagen en una nueva pestaña".
          </li>
          <li>Paso 4: Copia y pega la nueva URL obtenida.</li>
          <li>
            En esta página puedes buscar imágenes para tu Pokémon.
            <br />{" "}
            <a
              href="https://pics.alphacoders.com/"
              target="_blank"
              rel="noopener noreferrer"
              >
              https://pics.alphacoders.com/
            </a>
            .
          </li>
        </ol>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <div>
          <br />
          <br />
          <br />
          <br />
          <label> Imagen (URL) </label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={handleChange}
            />
          {completedFields.image && <span style={{ color: "green" }}>✅</span>}
          <span className="error-message">{errors.image}</span>
          {input.image && (
            <img
            src={input.image}
            alt="Imagen previa"
            style={{ maxWidth: "200px", marginTop: "10px" }}
            />
            )}
        </div>
        <div className="form-content">
          <div className="input-group">
            <label> Nombre </label>
            <input name="name" value={input.name} onChange={handleChange} />
            {completedFields.name && (
              <span className="validation-icon">✅</span>
              )}
            <span className="error-message">{errors.name}</span>
          </div>
          <div className="input-group">
            <label> Vida </label>
            <input name="life" value={input.life} onChange={handleChange} />
            {completedFields.life && (
              <span className="validation-icon">✅</span>
              )}
            <span className="error-message">{errors.life}</span>
          </div>
          <div className="input-group">
            <label> Ataque </label>
            <input name="attack" value={input.attack} onChange={handleChange} />
            {completedFields.attack && (
              <span className="validation-icon">✅</span>
              )}
            <span className="error-message">{errors.attack}</span>
          </div>
          <div className="input-group">
            <label> Defensa </label>
            <input
              name="defense"
              value={input.defense}
              onChange={handleChange}
              />
            {completedFields.defense && (
              <span className="validation-icon">✅</span>
              )}
            <span className="error-message">{errors.defense}</span>
          </div>
          <div className="input-group">
            <label> Velocidad </label>
            <input name="speed" value={input.speed} onChange={handleChange} />
            {completedFields.speed && (
              <span className="validation-icon">✅</span>
              )}
            <span className="error-message">{errors.speed}</span>
          </div>
          <div className="input-group">
            <label> Altura </label>
            <input name="height" value={input.height} onChange={handleChange} />
            {completedFields.height && (
              <span className="validation-icon">✅</span>
              )}
            <span className="error-message">{errors.height}</span>
          </div>
          <div className="input-group">
            <label> Peso </label>
            <input name="weight" value={input.weight} onChange={handleChange} />
            {completedFields.weight && (
              <span className="validation-icon">✅</span>
              )}
            <span className="error-message">{errors.weight}</span>
          </div>
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
              className={`type-bubble ${
                selectedType === type ? "selected" : ""
              } ${isTypeSelected(type) ? "selected" : ""}`}
              >
                {type}
              </div>
            ))}
          </div>
          <div>
            {input.types.map((type) => (
              <span key={type} style={{ margin: "0 5px" }}>
                {type}
              </span>
            ))}
          </div>
          {completedFields.types && <span style={{ color: "green" }}>✅</span>}
          <span>{errors.types}</span>
        </div>
        {Object.values(errors).every((error) => !error) && (
          <button type="submit">Crear Pokémon</button>
          )}
      </form>
    </div>
          </div>
  );
}
        

export default Create;
