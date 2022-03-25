const request = require('supertest');
const app = require('../../app')
const mongoConnect = require('../../services/mongo')


describe('Launches API', () => {
    describe('TEST GET /launches', () => {
        beforeAll(async () => {
            await mongoConnect();
        })
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

