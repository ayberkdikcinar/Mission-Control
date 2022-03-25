const planets = require('../../models/planets.model.js');


async function getAllPlanets(req, res) {
    return res.status(200).json(await planets.getAllPlanets());
}

module.exports = {
    getAllPlanets,
}