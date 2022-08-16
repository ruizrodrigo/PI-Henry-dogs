const axios = require('axios')
const {Dog, Temperament} = require('../db')

const {API_KEY} = process.env

const getDogsApi = async () => {
    try {
        let dogs = []
        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        dogsApi.data.map(dog => {
            dogs.push({
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                weight: dog.weight.metric,
                weight_imperial: dog.weight.imperial,
                height: dog.height.metric,
                height_imperial: dog.height.imperial,
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
        const dogs = await Dog.findAll()
        var completeDogs = []
        await dogs.forEach(async dog => {
            var temps = ''
            let dbTemps = await dog.getTemperaments({attributes:['name']})
            await dbTemps.forEach(temp => {
                temps = temps + temp.dataValues.name + ', '
            })
            let parcialDog = dog.toJSON()
            completeDogs.push({...parcialDog, temperament: temps})
        })
        return completeDogs
}
const getAllDogs = async () => {
    try {
        let dogsDB = await getDogsDB()
        let dogsApi = await getDogsApi()
        return [...dogsApi, ...dogsDB]
    } catch (error) {
        console.log(error)
    }
        

}
const getTempsApi = async () => {
    try {
        const availableTemps = await Temperament.findAll({
            order: [
                ['name', 'ASC']
            ]})
        if(availableTemps.length) return availableTemps

        const tempsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(res => res.data)
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
            
            await Temperament.bulkCreate(apiTemps)
            let dbTemps = await Temperament.findAll(
                {order: [
                    ['name', 'ASC']
                ]}
            )
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