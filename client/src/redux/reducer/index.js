import { GET_USER, GET_BY_NAME, ORDER_POKEMONS_ALPHATICALLY, ORDER_POKEMONS_ATTACK, FILTER_POKEMONS_TYPES, FILTER_POKEMONS_ORIGIN, RESET_FILTERS, POKEMONS_TYPES_F_A } from "../actions"

let initialState = {allUsers:[],usersCopy:[] ,typesfiltered:[]}

function rootReducer(state = initialState, action) {
    console.log('Action:', action);
    console.log('Current State:', state);
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
            if (state.typesfiltered.length>0) {
                let orderPokemons = [...state.typesfiltered].sort((a, b) => {
                    if (action.payload === "F") {
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
            }else{
                let orderPokemons = [...state.usersCopy].sort((a, b) => {
                    if (action.payload === "F") {
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
            }
               
         case ORDER_POKEMONS_ATTACK:
                    let orderPokemonsAttack = [...state.usersCopy].sort((a, b) => {
                     
                      return action.payload === "H" ? a.attack - b.attack : b.attack - a.attack;
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
                        typesfiltered:pokemonsByTypes
                        };
        case FILTER_POKEMONS_ORIGIN:
            const PokemonOrigin = state.usersCopy.filter(
                (pokemon) => (action.payload === "B" ? typeof pokemon.id === "number" : typeof pokemon.id === "string")
              );
              return {
                ...state,
                allUsers: PokemonOrigin,
              };
        case RESET_FILTERS:
                return {
                  ...state,
                  allUsers: state.usersCopy,
                };
        case POKEMONS_TYPES_F_A:
            const PokemonFilter = state.typesfiltered.filter((types)=> types.fire(action.payload))
            return{
                ...state,
                typesfiltered: PokemonFilter
            }
                    
        default:
            return state
    }
    
}

export default rootReducer