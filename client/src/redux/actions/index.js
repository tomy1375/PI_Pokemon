import axios from "axios"

export const GET_USER = "GET_USER"

export function getUser() {
    return async function(dispatch){
        const response = await axios("https://pokeapi.co/api/v2/pokemon")
        return dispatch({
            type : "GET_USER",
            payload: response.data
        })
    }
}