const { Router } = require('express');
const {getAllDogs } = require('../functions/functions.js');
const {Dog} = require('../db')


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
                imageUrl: findedDog.image,
                weight: findedDog.weight,
                height: findedDog.height,
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
        let {name, height, weight, life_span} = req.body
        if(!name || !height || !weight) return res.status(404).json({err: 'Faltan datos'})
        const [newDog, created] = await Race.findOrCreate({
            where: {
                name,
                height,
                weight,
                life_span
            }
        })
        if(created) return res.json(newDog)
        throw new Error('La raza ya existe')
    } catch (error) {
        res.status(404).json({err: error.message})
    }
})

module.exports = routerDogs;
