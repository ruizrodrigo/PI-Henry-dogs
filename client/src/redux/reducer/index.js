import { GET_ALL_DOGS, GET_ALL_TEMPS, GET_DOG, CREATE_DOG, FILTER_TEMP, FILTER_DOG} from "../actions";

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
        case FILTER_TEMP:
            let filterDogs = []
            action.payload.forEach(el => {
                filterDogs = state.dogs.filter(e => e.temperament?.includes(el))
                state.dogs = filterDogs
            });
            return {
                ...state,
                dogs: filterDogs
            }
        case FILTER_DOG:
            if(action.extra) {
                return {
                    ...state,
                    dogs: action.extra.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
                }
            } else {
                return {
                    ...state,
                    dogs: state.dogs.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
                }
            }
        default:
           return {...state}
    }
}


export default rootReducer;