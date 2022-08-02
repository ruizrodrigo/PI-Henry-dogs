const axios = require('axios')
const {Race, Temperament} = require('../db')

const {API_KEY} = process.env

const getDogsApi = async () => {
    try {
        let dogs = []
        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        dogsApi.data.map(dog => {
            dogs.push({
                id: dog.id,
                name: dog.name,
                weight: dog.weight,
                height: dog.height,
                life_span: dog.life_span,
                temperament: dog.temperament
            })
        })
        return dogs
    } catch (error) {
        console.log(error.message)
    }
}
const getDogsDB = async () => {
        const dogs = await Race.findAll()
        return dogs
}
const getAllDogs = async () => {
   let dogsApi = await getDogsApi()
   let dogsDB = await getDogsDB()

   return [...dogsApi, ...dogsDB]
}
const getTempsApi = async () => {
    try {
        const tempsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`).then(res => res.data)

        if(tempsApi) {
            let temps = []
            tempsApi.map(temp => {
                if(temp.temperament) {
                    let arrayTemp = temp.temperament.split(', ')
                    arrayTemp.forEach(a => {
                        temps.push(a)
                     })
                    }
                })
            let filteredArray = [...new Set(temps)]
            apiTemps = []
            filteredArray.forEach(t => apiTemps.push({name: t}))
            
            let dbTemps = await Temperament.bulkCreate(apiTemps, {returning: true})
            return dbTemps
        } else {
            throw new Error('No se pudo obtener datos de la API')
        }
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getDogsApi,
    getDogsDB,
    getAllDogs,
    getTempsApi,
}