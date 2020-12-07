const mongoose = require('mongoose');
const Hall = require('../models/hall');
const Screening = require('../models/screening');
const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const { model } = require('../models/screening');

const request = supertest(app);

const mongo_url = `mongodb://localhost/test_api_routes`;

let token;

beforeAll(async () => {
    await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log("Connection to mongoDB Successful!"));
    await new User({ username: 'testusername', password: 'testpassword' }).save();
    res = await request.post('/api/login').send({ username: 'testusername', password: 'testpassword' });
    token = res.header['auth-token'];
});

function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    Promise.all(collections.map(collectionName => {
        const collection = mongoose.connection.collections[collectionName];
        return collection.deleteMany();
    })).catch(err => console.error(err));
}

afterEach(async () => {
    await removeAllCollections();
});

describe('GET /api/halls', () => {

    test('it should retrieve all halls', async () => {
        await new Hall({ name: 'hall1' }).save();
        await new Hall({ name: 'hall2' }).save();
        const res = await request.get('/api/halls');
        const expected = await Hall.find();
        expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expected));
    });

});

describe('POST /api/halls', () => {

    test('it should reject request when no token supplied', async () => {
        const hall = { name: 'hall1' };
        const res = await request.post('/api/halls').send(hall);
        const dbData = await Hall.findOne(hall);
        expect(res.text).toEqual(`No JWT token - access denied.`);
        expect(dbData).toEqual(null);
    });

    test('it should reject request when bad token supplied', async () => {
        const hall = { name: 'hall1' };
        const badToken = token.slice(0, -1) + String.fromCharCode((token.charCodeAt(token.length - 1) - 1) % 65535);
        const res = await request.post('/api/halls').set('auth-token', badToken).send(hall);
        const dbData = await Hall.findOne(hall);
        expect(res.status).toEqual(403);
        expect(res.body).toEqual({ message: 'invalid signature', name: 'JsonWebTokenError' });
        expect(dbData).toEqual(null);
    });

    test('it should save a new hall when request contains valid token', async () => {
        const hall = { name: 'hall1' };
        const res = await request.post('/api/halls').set('auth-token', token).send(hall);
        const dbData = await Hall.findOne(hall);
        expect(res.text).toEqual(`Successfully created new hall: ${hall.name}.`);
        expect(dbData.name).toEqual(hall.name);
    });

});