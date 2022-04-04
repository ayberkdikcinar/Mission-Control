const app = require('./app.js');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsDataFromCsv } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;


async function startServer() {
    await mongoConnect();
    await loadPlanetsDataFromCsv();
    await loadLaunchesData();
    app.listen(PORT, () => {
        console.log(`Listening PORT ${PORT}`)
    });
}

startServer();





