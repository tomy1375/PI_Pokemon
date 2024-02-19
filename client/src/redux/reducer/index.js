import { GET_USER, GET_BY_NAME, ORDER_POKEMONS_ALPHATICALLY, ORDER_POKEMONS_ATTACK, FILTER_POKEMONS_TYPES, FILTER_POKEMONS_ORIGIN } from "../actions"

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
         case FILTER_POKEMONS_TYPES:
                        const pokemonsByTypes = state.usersCopy.filter((pokemon) => pokemon.types.includes(action.payload))
                        return {
                            ...state,
                            allUsers: pokemonsByTypes,
                        };
        case FILTER_POKEMONS_ORIGIN:
            const PokemonOrigin = state.usersCopy.filter(
                (pokemon) => (action.payload === "A" ? typeof pokemon.id === "number" : typeof pokemon.id === "string")
              );
              return {
                ...state,
                allUsers: PokemonOrigin,
              };
                    
        default:
            return state
    }
    
}

export default rootReducer