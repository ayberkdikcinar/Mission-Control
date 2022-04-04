const request = require('supertest');
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
const { loadPlanetsDataFromCsv } = require('../../models/planets.model')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsDataFromCsv();
    })
    describe('TEST GET /launches', () => {
        test('should respond with 200 success', async () => {
            const response = await request(app).get('/v1/launches').expect(200);
        });
    });
    describe('TEST POST /launches', () => {
        test('should respond with 201 created', async () => {
            const response = await request(app).post('/v1/launches').send({
                mission: "Test Mission",
                rocket: "Test Rocket",
                target: "Kepler-712 c",
                launchDate: new Date("September 25 2030"),
            }).expect(201);
        });
    })
    afterAll(async () => {
        await mongoDisconnect();
    });
})

