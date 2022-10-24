import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

// eslint-disable-next-line no-underscore-dangle
const validId = adminsSeed[0]._id;
const notValidId = '635440f23948f3ea6b17f6';
const notFoundId = '635440f23948f3ea6b170000';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('GET /admins', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toBe('Admins found successfully');
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
  test('Should return status code 404 with wrong path', async () => {
    const response = await request(app).get('/admin').send();
    expect(response.status).toBe(404);
  });
});

describe('GET BY ID /:id', () => {
  test('Should return status 200 and an admin by id', async () => {
    const response = await request(app).get(`/admins/${validId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Admin with id ${validId} found successfully`);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
  test('Should return status 404 when it doesn`t find the id', async () => {
    const response = await request(app).get(`/admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Admin with id ${notFoundId} not found`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
  test('Should return status 400 when it is not a valid id', async () => {
    const response = await request(app).get(`/admins/${notValidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Cannot get Admin by ${notValidId}`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
