import { GET_USER, GET_BY_NAME } from "../actions"

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
        default:
            return state
    }
    
}

export default rootReducer