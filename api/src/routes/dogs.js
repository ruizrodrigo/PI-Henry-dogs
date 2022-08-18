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
            if(findedDog.length) return res.json(findedDog) 
            else throw new Error("Can't find that race")
        }
    } catch (error) {
        res.status(404).json({err: error.message})
    }
}) 

routerDogs.get('/:idRace', async (req, res) => {
    let {idRace} = req.params

    try {
        let dogs = await getAllDogs()
        let findedDog = dogs.find(dog => dog.id.toString() === idRace.toString())
        if(findedDog) { 
            res.json({
                id: findedDog.id,
                name: findedDog.name,
                image: findedDog.image,
                weight: findedDog.weight,
                weight_imperial: findedDog.weight_imperial,
                height: findedDog.height,
                height_imperial: findedDog.height_imperial,
                life_span: findedDog.life_span,
                temperament: findedDog.temperament
            })
        } else{
            res.status(404).json({err:"Can't find any race whit that ID"})
        }
    } catch(err) {
        res.status(404).send({err: err.message})
    }
})

routerDogs.post('/', async(req, res) => {
    try {
        let {name, height, height_imperial, weight, weight_imperial, life_span, image, temperaments} = req.body
        if(!name || !height || !weight) return res.status(404).send({err: 'Missing Data'})
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
        if(!created) throw new Error('That race has already been created')
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
