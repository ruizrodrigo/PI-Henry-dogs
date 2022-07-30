const axios = require('axios')
const {Race} = require('../db')

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

module.exports = {
    getDogsApi,
    getDogsDB,
    getAllDogs
}