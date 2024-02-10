import axios from "axios"

export const GET_USER = "GET_USER"
export const GET_BY_NAME = "GET_BY_NAME"


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