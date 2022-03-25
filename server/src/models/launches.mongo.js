const { Schema, model } = require('mongoose');

const launchSchema = new Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 100,
        min: 100,
        max: 999
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    customers: [String],
    target: {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    },
    upcoming: {
        type: Boolean,
        required: true,
    }
});

module.exports = model('launches', launchSchema);