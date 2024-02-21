import './create.styles.css';

export const validation = (input) => {
  const errors = {};
  const isNumeric = /^[0-9]+$/;
  const isValidRange = /^(?:1000|[1-9]\d{0,2}|[1-9])$/; // Corregido para permitir números entre 1 y 1000
  const isAlpha = /^[A-Za-z]+$/; // Expresión regular para permitir solo letras
  const regex = /^(?:100|\d{1,2})$/; // del 1 al 100
  const caracteresEspeciales = /[!@#$%^&*()_+{}[\]:;<>,.?/\\|-]/;

  if (input.name.length > 12) {
    errors.name = "El nombre no debe exceder los 12 caracteres";
  } else if (!isAlpha.test(input.name)) {
    errors.name = "El nombre debe contener solo letras";
  }

  if (caracteresEspeciales.test(input.name)) {
    errors.name = "El nombre no puede contener caracteres especiales";
  }

  if (!isValidRange.test(input.weight)) {
    errors.weight = "El peso debe ser un numero entre 1 y 100";
  }

  const fields = ["life", "attack", "defense", "speed", "height"];

  fields.forEach((field) => {
    if (!isNumeric.test(input[field]) || !regex.test(input[field])) {
      errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } debe ser un número válido entre 1 y 100`; // Actualizado el mensaje de error
    }
  });
  if (input.types.length === 0) {
    errors.types = "Selecciona al menos un tipo";
  }

  return errors;
}
