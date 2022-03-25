const app = require('./app.js');
const dbConnect = require('./services/mongo');
const { loadPlanetsDataFromCsv } = require('./models/planets.model');


const PORT = process.env.PORT || 8000;


async function startServer() {
    await dbConnect();
    await loadPlanetsDataFromCsv();
    app.listen(PORT, () => {
        console.log(`Listening PORT ${PORT}`)
    });
}

startServer();





