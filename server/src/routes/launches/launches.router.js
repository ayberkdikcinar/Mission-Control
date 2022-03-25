const express = require('express');
const missionsRouter = express.Router();
const { launchNewMission, getAllLaunches, deleteLaunch } = require('./launches.controller')

missionsRouter.post('/launches', launchNewMission)
missionsRouter.get('/launches', getAllLaunches)
missionsRouter.delete('/launches/:id', deleteLaunch)

module.exports = missionsRouter;