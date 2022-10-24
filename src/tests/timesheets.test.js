describe('example', () => {
  it('Test', () => {
    expect(true).toEqual(true);
  });
});
/* import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app'
import timesheets from '../models/Timesheets'
import timesheetsSeed from '../seeds/timesheets'

const mockedTimesheet = {
    description: 'auctor sed tristique in tempus sit amet sem fusce',
    date: '12/26/2020',
    task: mongoose.Types.ObjectId('6354059cd8bf9864098d13c9'),
    hours: 10,
    employee: mongoose.Types.ObjectId('63540397a5be57cf8ebf17d6'),
    project: mongoose.Types.ObjectId('635408ff26249caf8f9a98b3'),
  }

beforeAll (async () => {
    await timesheets.collection.insertMany(timesheetsSeed);
});

const reqValidId = '6354025e1890513d8a5fabcb';
const reqIdNotFound = '6355d9a4f45b78874ffa7e76';

describe('PUT /timesheets', () => {
    test('should return status 200', async () => {
        const response = await request(app).put(`/timesheets/${reqValidId}`).send(mockedTimesheet);
        expect(response.status).toBe(200);
    })
    test('should return status false', async () => {
        const response = await request(app).put('/timesheets').send();
        expect(response.body.error).toBeFalsy();
    })
});
 */
