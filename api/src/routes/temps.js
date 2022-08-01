const { Router } = require('express');
const { getTempsApi} = require('../functions/functions');
const Temperament = require('../db.js');


const routerTemps = Router();

routerTemps.get('/', async (req, res) => {
    try {
        const tempsDB = await getTempsApi();
        res.json(tempsDB)
    } catch (err) {
        res.status(404).json({err: err.message})
    }
})

module.exports = routerTemps;
