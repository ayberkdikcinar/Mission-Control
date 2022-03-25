const mongoose = require('mongoose');
require('dotenv').config();
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5r0s1.mongodb.net/nasaDB?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
    console.debug('DB Connection opened.');
})
mongoose.connection.on('error', (err) => {
    console.error(`${err} DB Connection error`);
})

async function mongoConnect() {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        handleError(error);
    }
}

module.exports = mongoConnect;