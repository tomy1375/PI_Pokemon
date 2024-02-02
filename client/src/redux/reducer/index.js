import { GET_USER } from "../actions"

let initialState = {allaUser:[], post:[]}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return{
                ...state,
                allaUser: action.payload
            }
        default:
            return state
    }
    
}

export default rootReducer