/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import superAdmins from '../models/Super-admins';
import superAdminsSeeds from '../seeds/super-admins';

beforeAll(async () => {
  await superAdmins.collection.insertMany(superAdminsSeeds);
});
let superadminId = '';
describe('GET /superadmins', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/super-admins').send();
    superadminId = response.body.data[0]._id;
    expect(response.status).toBe(200);
  });

  test('Should return error false', async () => {
    const response = await request(app).get('/super-admins').send();

    expect(response.body.error).toBeFalsy();
  });

  test('Should return more than one superAdmin', async () => {
    const response = await request(app).get('/super-admins').send();

    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /superadmins empty data', () => {
  test('Should return status code 404 if superadmin is not found', async () => {
    await superAdmins.deleteMany();
    const response = await request(app).get('/super-admins').send();

    expect(response.status).toBe(404);
    expect(response.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });

  afterAll(async () => {
    await superAdmins.collection.insertMany(superAdminsSeeds);
  });
});

const mockedSuperAdmin = {
  name: 'Kelbee',
  lastName: 'Redholls',
  email: 'kredholls0@mediafire.com',
  password: 'GJk0kylyhY',
  dni: '30112908',
  phone: '5493415558701',
};

const mockedSuperAdminWrong = {
  name: 'Ale',
  lastName: '',
  email: 'telegraph.com',
  password: 'nXGTc1i6VEH',
  dni: '39109775',
  phone: '549116002873',
};

describe('POST /superadmins', () => {
  test('Should create a superadmin', async () => {
    const response = await request(app).post('/super-admins').send(mockedSuperAdmin);

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  test('Should not create a superadmin', async () => {
    const response = await request(app).post('/super-admins').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "name" is required');
    expect(response.body.error).toBeTruthy();
  });

  test('Should return error using wrong data', async () => {
    const response = await request(app).post('/super-admins').send(mockedSuperAdminWrong);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return error with empty data', async () => {
    const response = await request(app).post('/super-admins').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

const badRequest = '63540469873594f152b2ad3b';

describe('GETbyID /superadmins', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get(`/super-admins/${superadminId}`).send();

    expect(response.status).toBe(200);
  });

  test('Should return error false', async () => {
    const response = await request(app).get(`/super-admins/${superadminId}`).send();

    expect(response.body.error).toBeFalsy();
  });

  test('Should return one superadmin', async () => {
    const response = await request(app).get(`/super-admins/${superadminId}`).send();

    expect(response.body.data._id).toContain(superadminId);
  });

  test('Should return status code 404', async () => {
    const response = await request(app).get(`/super-admins/${badRequest}`).send();

    expect(response.status).toBe(404);
  });

  test('Should return error true', async () => {
    const response = await request(app).get(`/super-admins/${badRequest}`).send();

    expect(response.status).toBeTruthy();
  });

  test('Should return data undefined', async () => {
    const response = await request(app).get(`/super-admins/${badRequest}`).send();

    expect(response.body.data).toBe(undefined);
  });
});
