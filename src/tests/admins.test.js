import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

// eslint-disable-next-line no-underscore-dangle
const validId = adminsSeed[0]._id;
const invalidId = '6354025e1890513d8a5fabcbsdf';
const idNotFound = '6355d9a4f45b78874ffa7e76';
const mockedAdmin = {
  name: 'Dixi',
  lastName: 'Petow',
  email: 'dpetow0@elpais.com',
  password: 'iGZn65fo3',
  dni: 33102445,
  phone: 5493416787845,
};
const wrongAdmin = {
  name: 'fo',
  lastName: 'Shreeve',
  email: 'fshreeve1@sogou.com',
  password: 'MjlXDlO3',
  dni: 36102045,
  phone: 549116707345,
};
const incompleteAdmin = {
  name: 'Micheline',
  lastName: 'Aksell',
  email: 'maksell0@reddit.com',
  password: 'BlAaH454',
  dni: 29778940,
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
    const response = await request(app).get(`/admins/${idNotFound}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Admin with id ${idNotFound} not found`);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return status 400 and invalid id error message when passed in an invalid id', async () => {
    const response = await request(app).get(`/admins/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Cannot get Admin by ${invalidId}`);
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
    expect(response.body.message).toBe('Cannot create user: "name" is required');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return status 400 when send invalid value in body', async () => {
    const response = await request(app).post('/admins').send(wrongAdmin);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Cannot create user: "name" length must be at least 3 characters long');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('PUT /admins', () => {
  test('Should modify an admin', async () => {
    const response = await request(app).put(`/admins/${validId}`).send(mockedAdmin);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Admin with id ${validId} updated successfully`);
  });

  test('Should not modify an admin because of missing required fields', async () => {
    const response = await request(app).put(`/admins/${validId}`).send(incompleteAdmin);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toBeDefined();
  });

  test('Should not modify an admin because of invalid body', async () => {
    const response = await request(app).put(`/admins/${validId}`).send(wrongAdmin);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toBeDefined();
  });

  test('Should not modify an admin because of invalid id', async () => {
    const response = await request(app).put(`/admins/${invalidId}`).send(mockedAdmin);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Admin with id ${invalidId} not found`);
  });

  test('Should fail to modify admin: id not found', async () => {
    const response = await request(app).put(`/admins/${idNotFound}`).send(mockedAdmin);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Admin with id ${idNotFound} not found`);
  });
});

describe('DELETE /admins', () => {
  test('Should delete an admin', async () => {
    const response = await request(app).delete(`/admins/${validId}`).send();
    expect(response.status).toBe(204);
  });

  test('Should not delete an admin because of invalid id', async () => {
    const response = await request(app).delete(`/admins/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Admin with id ${invalidId} not found`);
  });

  test('Should fail to delete admin: id not found', async () => {
    const response = await request(app).delete(`/admins/${idNotFound}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Admin with id ${idNotFound} not found`);
  });
});
