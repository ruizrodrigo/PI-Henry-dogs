const { Router } = require('express');
const {getAllDogs } = require('../functions/functions.js');
const {Dog} = require('../db');
const {Temperament} = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const routerDogs = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
routerDogs.get('/', async (req, res) => {
    
    let {name} = req.query
    try {
        if(!name) {
            const getDogs = await getAllDogs()
            res.json(getDogs)
        } else {
            const getDogs = await getAllDogs()
            let findedDog = getDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            findedDog.length ? res.json(findedDog) : res.status(404).json({err: 'No se encontro la raza solicitada'})
        }
    } catch (error) {
        res.status(404).json({err: error.message})
    }
}) 

routerDogs.get('/:idRace', async (req, res) => {
    let {idRace} = req.params

    try {
        let dogs = await getAllDogs()
        let findedDog = dogs.find(dog => dog.id.toString() === idRace)
        if(findedDog) { 
            res.json({
                id: findedDog.id,
                name: findedDog.name,
                image: findedDog.image,
                weight: findedDog.weight.metric,
                weight_imperial: findedDog.weight.imperial,
                height: findedDog.height.metric,
                height_imperial: findedDog.height.imperial,
                life_span: findedDog.life_span,
                temperament: findedDog.temperament
            })
        } else{
            res.status(404).json({err:'No se halló ninguna raza con ese ID'})
        }
    } catch(err) {
        res.status(404).send({err: err.message})
    }
})

routerDogs.post('/', async(req, res) => {
    try {
        let {name, height, height_imperial, weight, weight_imperial, life_span, image, temperaments} = req.body
        if(!name || !height || !weight) return res.status(404).send({err: 'Faltan datos'})
        const [newDog, created] = await Dog.findOrCreate({
            where: {
                name,
                height,
                height_imperial,
                weight,
                weight_imperial,
                life_span,
                image
            }
        })
        if(!created) throw new Error('La raza ya existe')
        else { 
            temperaments.forEach(async temp => {
                let asocTemp = await Temperament.findByPk(temp)
                newDog.addTemperament(asocTemp)
            })
            return res.json(newDog)
        }
    } catch (error) {
        res.status(404).send({err: error.message})
    }
})

module.exports = routerDogs;
