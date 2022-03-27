const express = require('express');
const planetsRouter = require('../routes/planets/planets.router.js');
const missionsRouter = require('../routes/launches/launches.router');


const apiV1Router = express.Router();

apiV1Router.use(planetsRouter);
apiV1Router.use(missionsRouter);


module.exports = {
    apiV1Router
}