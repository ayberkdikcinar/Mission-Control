const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { apiV1Router } = require('./routes/api_v1')
const bodyParser = require('body-parser')
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json())
app.use(morgan("combined"));
app.use('/v1', apiV1Router);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;