export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG = 'GET_DOG';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_ALL_TEMPS = 'GET_ALL_TEMPS'
export const FILTER_TEMP = 'FILTER_TEMP'
export const FILTER_DOG = 'FILTER_DOG'
export const FILTER_ALP = 'FILTER_ALP'
export const FILTER_WEIGHT = 'FILTER_WEIGHT'
export const CLEAR_DOG = 'CLEAR_DOG'
export const SET_PAGE = 'SET_PAGE'
export const FILTER_LOC = 'FILTER_LOC'

export const getAllDogs = (name) => dispatch => {
    const url = name ? `http://localhost:3001/dogs${name}` :
    `http://localhost:3001/dogs`
    return fetch(url)
    .then(res => res.json())
    .then(data => {
        dispatch({type: GET_ALL_DOGS, payload: data})
    })
}

export const getDog = (id) => dispatch => {
    return fetch(`http://localhost:3001/dogs/${id}`)
    .then(res => res.json())
    .then(data => {
        dispatch({type: GET_DOG, payload: data });
    })
}

export const getTemps = () => dispatch => {
    return fetch('http://localhost:3001/temperaments')
    .then(res => res.json())
    .then(data => {
        dispatch({type: GET_ALL_TEMPS, payload:data})
    });
}

export const createDog = (newDog) => dispatch => {
        return fetch('http://localhost:3001/dogs', 
        {method: 'POST',
        body: JSON.stringify(newDog),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json(), error => {return error})
        .then(data => {
            dispatch({type: CREATE_DOG, payload: data})
        }) 
    } 

export const setPage = (payload) => {
    return {
        type: SET_PAGE,
        payload
    }
}

export const filterTemp = (payload) => {
    return {
        type: FILTER_TEMP,
        payload
    }
}

export const filterAlp = (payload) => {
    return {
        type: FILTER_ALP,
        payload
    }
}

export const filterLoc = (payload) => {
    return {
        type: FILTER_LOC,
        payload
    }
}

export const filterWeight = (payload) => {
    return {
        type: FILTER_WEIGHT,
        payload
    }
}

export const filterDog = (payload, extra) => {
        return {
            type: FILTER_DOG,
            payload,
            extra
        }
}

export const clearDog = (payload) => {
    return {
        type: CLEAR_DOG,
        payload
    }
}