import { GET_ALL_DOGS, GET_ALL_TEMPS, GET_DOG, CREATE_DOG, FILTER_TEMP, FILTER_DOG, FILTER_ALP, FILTER_WEIGHT} from "../actions";

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
                dogs: [...state.dogs, action.payload],
                dog: action.payload
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
        case FILTER_WEIGHT:
            if(action.payload === 'ASC') {
                return {
                    ...state,
                    dogs: state.dogs.sort((a,b) => {
                        let weight1 = a.weight.includes('NaN') ? 0 : parseInt(a.weight.split(' - ')[0])
                        let weight2 = b.weight.includes('NaN') ? 0 : parseInt(b.weight.split(' - ')[0])
                        
                        if (weight1 > weight2) {
                            return 1;
                          }
                          if (weight1 < weight2) {
                            return -1;
                          }
                          return 0;                    
                    })}
                } else if (action.payload === 'DES'){
                    return {
                        ...state,
                        dogs: state.dogs.sort((a,b) => {
                            let weight1 = a.weight.includes('NaN') ? 0 : parseInt(a.weight.split(' - ')[0])
                            let weight2 = b.weight.includes('NaN') ? 0 : parseInt(b.weight.split(' - ')[0])
                            
                            if (weight1 < weight2) {
                                return 1;
                              }
                              if (weight1 > weight2) {
                                return -1;
                              }
                              return 0;                    
                        })}
                    }
        case FILTER_ALP:
            if(action.payload === 'A-Z') {
            return {
                ...state,
                dogs: state.dogs.sort((a,b) => {
                    if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      return 0;                    
                })}
            } else if (action.payload === 'Z-A'){
                return {
                    ...state,
                    dogs: state.dogs.reverse()
                    }
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