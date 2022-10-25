import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

// eslint-disable-next-line no-underscore-dangle
const validId = adminsSeed[0]._id;
const notValidId = '635440f23948f3ea6b17f6';
const notFoundId = '635440f23948f3ea6b170000';
const mockedAdmin = {
  name: 'user',
  lastName: 'user',
  email: 'user@user.com',
  password: 'pass1234',
  dni: 1234567890,
  phone: 341341341,
};
const AdminBadRequest = {
  name: '',
  lastName: 'user',
  email: 'user@user.com',
  password: 'pass1234',
  dni: 1234567,
  phone: 341341341,
};

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('GET /admins', () => {
  test('Should return status code 200 and all admins', async () => {
    const response = await request(app).get('/admins').send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admins found successfully');
    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
  });
});
test('Should return status code 404 with admins not found', async () => {
  await Admins.deleteMany();
  const response = await request(app).get('/admins').send();

  expect(response.status).toBe(404);
  expect(response.body.message).toEqual('Admins not found');
  expect(response.body.data).toBeUndefined();
  expect(response.body.error).toBeTruthy();

  await Admins.collection.insertMany(adminsSeed);
});

describe('GET BY ID /:id', () => {
  test('Should return status 200 and successfully the admin when passed in a valid id', async () => {
    const response = await request(app).get(`/admins/${validId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Admin with id ${validId} found successfully`);
    expect(response.body.data).toBeDefined();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toEqual(`${validId}`);
    expect(response.body.error).toBeFalsy();
  });

  test('Should return status 404 and not found id error message when passed in an id not found in DB', async () => {
    const response = await request(app).get(`/admins/${notFoundId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Admin with id ${notFoundId} not found`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return status 400 and invalid id error message when passed in an invalid id', async () => {
    const response = await request(app).get(`/admins/${notValidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Cannot get Admin by ${notValidId}`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST', () => {
  test('Should return status 201 and successfully message when create an admin', async () => {
    const response = await request(app).post('/admins').send(mockedAdmin);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Admin created successfully');
    expect(response.body.data).toMatchObject({
      name: mockedAdmin.name,
      lastName: mockedAdmin.lastName,
      email: mockedAdmin.email,
      password: mockedAdmin.password,
      dni: mockedAdmin.dni,
      phone: mockedAdmin.phone,
    });
    expect(response.body.error).toBeFalsy();
  });

  test('Should return status 400 when send empty body', async () => {
    const response = await request(app).post('/admins').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cannot create admin: "name" is required');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return status 400 when send invalid value in body', async () => {
    const response = await request(app).post('/admins').send(AdminBadRequest);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cannot create admin: "name" is not allowed to be empty');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
