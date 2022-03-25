const launchesModel = require('./launches.mongo');
const planetModel = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

async function getAllLaunches() {
    return await launchesModel.find({}, { '__v': 0, '_id': 0 });

}
async function addNewLaunch(launch) {
    try {
        const checkPlanetExistance = await planetModel.findOne({ keplerName: launch.target });
        if (checkPlanetExistance) {
            Object.assign(launch, {
                flightNumber: (await getLatestFlightNumber()) + 1,
                upcoming: true,
                success: true,
                customers: ['A', 'B'],
            });
            return await launchesModel.findOneAndUpdate(
                { flightNumber: launch.flightNumber },
                launch,
                { upsert: true, new: true });
        }
        else {
            return { "error": "Planet does not exist" }
        }
    } catch (error) {
        return error;
    }

    //throw new Error('Planet does not exist.');
}

async function deleteLaunch(id) {
    try {
        const response = await launchesModel.findOneAndUpdate(
            { flightNumber: Number(id) },
            { upcoming: false, success: false },
            { '__v': 0, '_id': 0, returnOriginal: false });
        if (response)
            return response;
        throw new Error('Launch does not exist.')
    } catch (error) {
        return { "message": error.message };
    }
}
async function getLatestFlightNumber() {

    const lastLaunch = await launchesModel.findOne().sort('-flightNumber');
    if (!lastLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return lastLaunch.flightNumber;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch
}
