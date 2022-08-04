import { GET_ALL_DOGS, GET_ALL_TEMPS, GET_DOG, CREATE_DOG, } from "../actions";

const initialState = {
    dogs: [],
    dog: {},
    temps: [],
}

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DOG:
            return {
                ...state,
                dog: action.payload
            }
        case GET_ALL_TEMPS:
            return {
                ...state,
                temps: action.payload
            }
        case CREATE_DOG:
            return {
                ...state,
                dogs: [...state.dogs, action.payload]
            }
    
        default:
           return {...state}
    }
}


export default rootReducer;