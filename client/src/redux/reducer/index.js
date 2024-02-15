import { GET_USER, GET_BY_NAME, ORDER_POKEMONS_ALPHATICALLY, ORDER_POKEMONS_ATTACK } from "../actions"

let initialState = {allUsers:[],usersCopy:[], post:[]}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return{
                ...state,
                allUsers: action.payload,
                usersCopy: action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                allUsers:action.payload
            }
        case ORDER_POKEMONS_ALPHATICALLY:
                let orderPokemons = [...state.usersCopy].sort((a, b) => {
                    if (action.payload === "A") {
                        return a.name.localeCompare(b.name);
                    } else if (action.payload === "D") {
                        return b.name.localeCompare(a.name);
                    } else {
                        return 0;
                    }
                });
                return {
                    ...state,
                    allUsers: orderPokemons  
                };
         case ORDER_POKEMONS_ATTACK:
                    let orderPokemonsAttack = [...state.usersCopy].sort((a, b) => {
                     
                      return action.payload === "A" ? a.attack - b.attack : b.attack - a.attack;
                    });
                    return {
                      ...state,
                      allUsers: orderPokemonsAttack
                    };
        default:
            return state
    }
    
}

export default rootReducer