const launches = require('../../models/launches.model.js');

async function launchNewMission(req, res) {
    try {
        const launch = req.body;
        if (!launch.target || !launch.rocket || !launch.mission) {
            return res.status(400).json({ error: "Missin arguments" });
        }
        const response = await launches.scheduleNewLaunch(launch);
        console.log(response);
        if (!response.error)
            return res.status(201).json(launch);
        return res.status(404).json(response);
    } catch (error) {
        return res.status(500).json({ "error": error.message });
    }


}
async function getAllLaunches(req, res) {
    return res.status(200).json(await launches.getAllLaunches());
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