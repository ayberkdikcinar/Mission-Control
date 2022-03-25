const csv_parser = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planetModel = require('./planets.mongo');


function loadPlanetsDataFromCsv() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(csv_parser.parse({
                comment: "#",
                columns: true
            })
                .on('data', async (data) => {
                    if (isHabitablePlanet(data)) {
                        await addPlanet(data);
                    }
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    console.log(error);
                    reject(error);
                })
            );
    });
}

async function addPlanet(data) {
    return await planetModel.updateOne(
        { keplerName: data.kepler_name },
        { keplerName: data.kepler_name },
        { upsert: true })
}

function isHabitablePlanet(planet) {
    return planet.koi_pdisposition == "CANDIDATE" && planet.koi_insol > 0.36 && planet.koi_insol < 1.11 && planet.kepler_name
}
async function getAllPlanets() {
    try {
        console.log('im here')
        return await planetModel.find(
            {},
            { '__v': 0, '_id': 0 });
    } catch (error) {
        console.error(error);
    }

}
module.exports = {
    loadPlanetsDataFromCsv,
    getAllPlanets,
}


