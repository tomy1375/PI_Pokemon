import './create.styles.css';

export const validation = (input) => {
  const errors = {};
  const isNumeric = /^[0-9]+$/;
  const isValidRange = /^(0|[1-9][0-9]?|1000)$/; // Corregido para permitir números entre 1 y 1000
  const isAlpha = /^[A-Za-z]+$/; // Expresión regular para permitir solo letras
  
  if (input.name.length > 12) {
    errors.name = "El nombre no debe exceder los 12 caracteres";
  } else if (!isAlpha.test(input.name)) {
    errors.name = "El nombre debe contener solo letras";
  }

  const fields = ['life', 'attack', 'defense', 'speed', 'height', 'weight'];

  fields.forEach((field) => {
    if (!isNumeric.test(input[field]) || !isValidRange.test(input[field])) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} debe ser un número válido entre 1 y 1000`; // Actualizado el mensaje de error
    }
  });

  return errors;
};
