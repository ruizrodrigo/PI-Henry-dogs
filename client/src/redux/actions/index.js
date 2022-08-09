export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG = 'GET_DOG';
export const CREATE_DOG = 'CREATE_DOG';
export const GET_ALL_TEMPS = 'GET_ALL_TEMPS'
export const FILTER_TEMP = 'FILTER_TEMP'
export const FILTER_DOG = 'FILTER_DOG'

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

export const createDog = ({name, height, weight, life_span}) => {
    return {
        type: CREATE_DOG,
        payload: {
            name,
            height,
            weight,
            life_span
        }
    }
}

export const filterTemp = (payload) => {
    return {
        type: FILTER_TEMP,
        payload
    }
}

export const getTemps = () => dispatch => {
    return fetch('http://localhost:3001/temperaments')
    .then(res => res.json())
    .then(data => {
        dispatch({type: GET_ALL_TEMPS, payload:data})
    });
}

export const filterDog = (payload, extra) => {
        return {
            type: FILTER_DOG,
            payload,
            extra
        }
}