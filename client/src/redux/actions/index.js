import axios from "axios"

export const GET_USER = "GET_USER"
export const GET_BY_NAME = "GET_BY_NAME"
export const ORDER_POKEMONS_ALPHATICALLY = "ORDER_POKEMONS_ALPHATICALLY"
export const ORDER_POKEMONS_ATTACK = "ORDER_POKEMONS_ATTACK"


export function getUser() {
    return async function(dispatch){
        const response = await axios("http://localhost:3001/pokemons")
        return dispatch({
            type : "GET_USER",
            payload: response.data
        })
    }
}

export function getByName(name) {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/pokemons/?name=${name}`)
        return dispatch({
            type : "GET_BY_NAME",
            payload: response.data
        })
    }
}

export function orderPokemonsAlphabetically(value) {
    return function (dispatch) {
      return dispatch({
        type: "ORDER_POKEMONS_ALPHATICALLY",
        payload: value,
      });
    };
  }

  export function orderPokemonsAttack(value) {
    return function (dispatch) {
      return dispatch({
        type: "ORDER_POKEMONS_ATTACK",
        payload: value,
      });
    };
  }