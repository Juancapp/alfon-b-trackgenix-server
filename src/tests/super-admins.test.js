import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seeds/super-admins';
import mongoose from 'mongoose';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

const reqId = mongoose.Types.ObjectId('63540469873594f152b2ad3d');

const mockedSuperAdmin = {
    name: 'Juan',
    lastName: 'Redholls',
    email: 'kredholls0@mediafire.com',
    password: 'GJk0kylyhY',
    dni: '30112908',
    phone: '5493415558701',
};

describe('PUT /super-admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).put('/super-admins/' + reqId).send(mockedSuperAdmin);
    expect(response.status).toBe(200);
  });
});
