const launchesModel = require('./launches.mongo');
const planetModel = require('./planets.mongo');
const axios = require('axios');

const DEFAULT_FLIGHT_NUMBER = 100;
const BASE_URL_LAUNCHES_SPACEX = 'https://api.spacexdata.com/v4/launches/';

async function loadLaunchesData() {
    const response = await getOneLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });

    if (!response) {
        await getLaunchesFromSpaceXAPI();
    }


}

async function getLaunchesFromSpaceXAPI() {
    const bodyQuery = {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                },

            ]
        },

    };
    const response = await axios.post(`${BASE_URL_LAUNCHES_SPACEX}query`, bodyQuery);
    const launchDocs = response.data.docs;

    for (const launchDoc of launchDocs) {

        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc.flight_number,
            mission: launchDoc.name,
            rocket: launchDoc['rocket'].name,
            success: launchDoc.success,
            upcoming: launchDoc.upcoming,
            customers: customers,
            launchDate: launchDoc.date_local,
            target: 'test'

        }
        await addNewLaunch(launch);
    }

}
async function getAllLaunches(skip, limit) {
    return await launchesModel.find({}, { '__v': 0, '_id': 0 })
        .skip(skip)
        .limit(limit)
        .sort({ flightNumber: 1 });
}
async function getOneLaunch(filter) {
    return await launchesModel.findOne(filter, { '__v': 0, '_id': 0 });
}
async function addNewLaunch(launch) {
    try {

        return await launchesModel.findOneAndUpdate(
            {
                flightNumber: launch.flightNumber
            },
            launch,
            { upsert: true, new: true });

    } catch (error) {
        return error;
    }
}
async function scheduleNewLaunch(launch) {
    Object.assign(launch, {
        flightNumber: (await getLatestFlightNumber()) + 1,
        upcoming: true,
        success: true,
        customers: ['A', 'B'],
    });
    return await addNewLaunch(launch);

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
    scheduleNewLaunch,
    deleteLaunch,
    loadLaunchesData
}
