import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

const reqId = '63540469873594f152b2ad3d';
const badReqId = '63540469873594f152b2ad3csda';
const notFoundId = '63540469873594f152b2ad3c';
let deleteReqError;
let deleteReqId;

const mockedSuperAdmin = {
  name: 'Juan',
  lastName: 'Redholls',
  email: 'kredholls0@mediafire.com',
  password: 'GJk0kylyhY',
  dni: 30112908,
  phone: 5493415558701,
};

const mockedBadSuperAdmin = {
  name: 'Juan',
  lastName: 'Redholls',
  email: 'kredholls0$mediafire.com',
  password: 'GJk0kylyhY',
  dni: 30112908000000,
  phone: 5493415558701,
};

const mockedIdSuperAdmin = {
  _id: '63540469873594f152b2ad3d',
  name: 'Juan',
  lastName: 'Redholls',
  email: 'kredholls0@mediafire.com',
  password: 'GJk0kylyhY',
  dni: 30112908,
  phone: 5493415558701,
};

describe('PUT /super-admins', () => {
  // Good request
  test('should return status 200', async () => {
    const response = await request(app).put(`/super-admins/${reqId}`).send(mockedSuperAdmin);
    expect(response.status).toBe(200);
  });
  test('should return error fasle', async () => {
    const response = await request(app).put(`/super-admins/${reqId}`).send(mockedSuperAdmin);
    expect(response.body.error).toBeFalsy();
  });
  test('bodys should be the same', async () => {
    const response = await request(app).put(`/super-admins/${reqId}`).send(mockedSuperAdmin);
    expect(response.body.data).toEqual(mockedIdSuperAdmin);
  });
  // Bad Id format
  test('should return status 400', async () => {
    const response = await request(app).put(`/super-admins/${badReqId}`).send(mockedSuperAdmin);
    expect(response.status).toBe(400);
  });
  test('should return error true', async () => {
    const response = await request(app).put(`/super-admins/${badReqId}`).send(mockedSuperAdmin);
    expect(response.body.error).toBeTruthy();
  });
  test('should return data undefined', async () => {
    const response = await request(app).put(`/super-admins/${badReqId}`).send(mockedSuperAdmin);
    expect(response.body.data).toBe(undefined);
  });
  // Inexistent Id
  test('should return status 404', async () => {
    const response = await request(app).put(`/super-admins/${notFoundId}`).send(mockedSuperAdmin);
    expect(response.status).toBe(404);
  });
  test('should return error true', async () => {
    const response = await request(app).put(`/super-admins/${notFoundId}`).send(mockedSuperAdmin);
    expect(response.body.error).toBeTruthy();
  });
  test('should return data undefined', async () => {
    const response = await request(app).put(`/super-admins/${notFoundId}`).send(mockedSuperAdmin);
    expect(response.body.data).toBe(undefined);
  });
  // Bad body request
  test('should return status 400', async () => {
    const response = await request(app).put(`/super-admins/${reqId}`).send(mockedBadSuperAdmin);
    expect(response.status).toBe(400);
  });
  test('should return error true', async () => {
    const response = await request(app).put(`/super-admins/${reqId}`).send(mockedBadSuperAdmin);
    expect(response.body.error).toBeTruthy();
  });
  test('should return data undefined', async () => {
    const response = await request(app).put(`/super-admins/${reqId}`).send(mockedBadSuperAdmin);
    expect(response.body.data).toBe(undefined);
  });
});

describe('DELETE /super-admins', () => {
  // Good request
  test('should return status 200', async () => {
    const response = await request(app).delete(`/super-admins/${reqId}`).send();
    expect(response.status).toBe(200);
    deleteReqError = response.body.error;
    // eslint-disable-next-line no-underscore-dangle
    deleteReqId = response.body.data._id;
  });
  test('should return error false', () => {
    expect(deleteReqError).toBeFalsy();
  });
  test('should return the same id as the request id', () => {
    expect(deleteReqId).toBe(reqId);
  });
  // Inexistent Id
  test('should return status 404', async () => {
    const response = await request(app).delete(`/super-admins/${notFoundId}`).send();
    expect(response.status).toBe(404);
  });
  test('should return error true', async () => {
    const response = await request(app).delete(`/super-admins/${notFoundId}`).send();
    expect(response.body.error).toBeTruthy();
  });
  test('should return data undefined', async () => {
    const response = await request(app).delete(`/super-admins/${notFoundId}`).send();
    expect(response.body.data).toBe(undefined);
  });
  // Bad Id format
  test('should return status 400', async () => {
    const response = await request(app).delete(`/super-admins/${badReqId}`).send();
    expect(response.status).toBe(400);
  });
  test('should return error true', async () => {
    const response = await request(app).delete(`/super-admins/${badReqId}`).send();
    expect(response.body.error).toBeTruthy();
  });
  test('should return data undefined', async () => {
    const response = await request(app).delete(`/super-admins/${badReqId}`).send();
    expect(response.body.data).toBe(undefined);
  });
});
