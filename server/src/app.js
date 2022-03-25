const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets/planets.router.js');
const missionsRouter = require('./routes/launches/launches.router');
const path = require('path');
const morgan = require('morgan');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(planetsRouter);
app.use(missionsRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;