import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeeds from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeeds);
});

const mockedAdmin = {
  name: 'Dixi',
  lastName: 'Petow',
  email: 'dpetow0@elpais.com',
  password: 'iGZn65fo3',
  dni: '33102445',
  phone: '5493416787845',
};

const incompleteAdmin = {
  name: 'Micheline',
  lastName: 'Aksell',
  email: 'maksell0@reddit.com',
  password: 'BlAaH454',
  dni: '29778940',
};

const wrongAdmin = {
  name: 'fo',
  lastName: 'Shreeve',
  email: 'fshreeve1@sogou.com',
  password: 'MjlXDlO3',
  dni: '36102045',
  phone: '549116707345',
};

const validId = '6354025e1890513d8a5fabcb';
const idNotFound = '6355d9a4f45b78874ffa7e76';

describe('PUT /admins', () => {
  test('Should modify an admin', async () => {
    const response = await request(app).put(`/admins/${validId}`).send(mockedAdmin);

    expect(response.status).toBe(200);
  });

  test('Should not modify an admin because of missing required fields', async () => {
    const response = await request(app).put(`/admins/${validId}`).send(incompleteAdmin);

    expect(response.status).toBe(400);
  });

  test('Should not modify an admin because of invalid body', async () => {
    const response = await request(app).put(`/admins/${validId}`).send(wrongAdmin);

    expect(response.status).toBe(400);
  });

  test('Should fail to delete admin: id not found', async () => {
    const response = await request(app).delete(`/admins/${idNotFound}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });
});

describe('DELETE /admins', () => {
  test('Should delete an admin', async () => {
    const response = await request(app).delete(`/admins/${validId}`).send();

    expect(response.status).toBe(200);
  });

  test('Should fail to delete admin: id not found', async () => {
    const response = await request(app).delete(`/admins/${idNotFound}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });
});
