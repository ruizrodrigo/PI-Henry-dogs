import { GET_ALL_DOGS, GET_ALL_TEMPS, GET_DOG, CREATE_DOG, FILTER_TEMP, FILTER_DOG, FILTER_ALP, FILTER_WEIGHT, CLEAR_DOG, SET_PAGE, FILTER_LOC} from "../actions";

const initialState = {
    dogs: [],
    dog: {},
    temps: [],
    currentPage: 0,
    error: ''
}

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            if(action.payload.err) throw new Error(action.payload.err)
            else {
                return {
                    ...state,
                    dogs: action.payload
                }
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
                if(!filterDogs.length) throw new Error("Can't find a race with that temperaments")
                else state.dogs = filterDogs
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
                else break
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
                    dogs: state.dogs.sort((a,b) => {
                        if (a.name < b.name) {
                            return 1;
                          }
                          if (a.name > b.name) {
                            return -1;
                          }
                          return 0;                    
                    })}
                }
            else break
        case FILTER_DOG:
            if(action.extra) {
                let newFilter = action.extra.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
                if(!newFilter.length) throw new Error("Can't find a race with that name")
                return {
                    ...state,
                    dogs: newFilter
                }
            } else {
                let newFilter2 = state.dogs.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
                if(!newFilter2.length) throw new Error("Can't find a race with that name")
                return {
                    ...state,
                    dogs: newFilter2
                }
            }
        case FILTER_LOC:
            if(action.payload === 'DB') {
                const filtered = state.dogs.filter(d => d.hasOwnProperty('createdInDB'))
                if(!filtered.length) throw new Error("There is'n any created dog")
                return {
                    ...state,
                    currentPage: 0,
                    dogs: filtered
                }
            } else if (action.payload === 'API'){ 
                const filtered2 = state.dogs.filter(d => !d.hasOwnProperty('createdInDB'))
                if(!filtered2.length) throw new Error("There is'n any pre-charged dog")
                return {
                    ...state,
                    currentPage: 0,
                    dogs: filtered2
                }
            } 
            return {
                ...state,
            }
        case CLEAR_DOG:
            return {
                ...state, 
                dog: action.payload
            }
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
           return {...state}
    }
}


export default rootReducer;