const request = require('supertest');
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
const { loadPlanetsDataFromCsv } = require('../../models/planets.model')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsDataFromCsv();
    })
    afterAll(async () => {
        await mongoDisconnect();
    })

    describe('TEST GET /launches', () => {
        test('should respond with 200 success', async () => {
            const response = await request(app).get('/launches').expect(200);
        });
    });

    describe('TEST POST /launches', () => {
        test('should respond with 201 created', async () => {
            const response = await request(app).post('/launches').send({
                mission: "Test Mission",
                rocket: "Test Rocket",
                target: "Kepler-712 c",
                launchDate: new Date("September 25 2030"),
            }).expect(201);
        });
        test('should respond with 404 not found', async () => {
            const response = await request(app).post('/launches').send({
                mission: "Test Mission",
                rocket: "Test Rocket",
                target: "NO TARGET GIVEN",
                launchDate: new Date("September 25 2030"),

            }).expect(404);
        });
    });
})

