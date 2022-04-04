const launches = require('../../models/launches.model.js');
const { arrangePaginationValues } = require('../../services/query')

async function launchNewMission(req, res) {

    const launch = req.body;
    console.log(req.body);
    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }
    await launches.scheduleNewLaunch(launch);
    return res.status(201).json(launch);

}
async function getAllLaunches(req, res) {
    const { skip, limit } = arrangePaginationValues(req.query);
    return res.status(200).json(await launches.getAllLaunches(skip, limit));
}

async function deleteLaunch(req, res) {
    console.log(req.params.id);
    const response = await launches.deleteLaunch(req.params.id);
    res.status(200).json(response);

}

module.exports = {
    launchNewMission,
    getAllLaunches,
    deleteLaunch,
}