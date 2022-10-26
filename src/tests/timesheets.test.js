import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import timesheets from '../models/Timesheets';
import timesheetsSeeds from '../seeds/timesheets';

beforeAll(async () => {
  await timesheets.collection.insertMany(timesheetsSeeds);
});

const mockedTimesheets = {
  description: 'auctor sed tristique in tempus sit amet sem fusce',
  date: '12/26/2020',
  task: mongoose.Types.ObjectId('6354059cd8bf9864098d13c9'),
  hours: 10,
  employee: mongoose.Types.ObjectId('63540397a5be57cf8ebf17d6'),
  project: mongoose.Types.ObjectId('635408ff26249caf8f9a98b3'),
};

const wrongMockedTimesheets = {
  description: 'auctor sed tristique in tempus sit amet sem fusce',
  date: 'April first',
  task: mongoose.Types.ObjectId('6354059cd8bf9864098d13c9'),
  hours: 10,
  employee: mongoose.Types.ObjectId('63540397a5be57cf8ebf17d6'),
  project: mongoose.Types.ObjectId('635408ff26249caf8f9a98b3'),
};

const mockedEmptyTimesheets = {
  description: '',
  date: '12/26/2020',
  task: mongoose.Types.ObjectId('6354059cd8bf9864098d13c9'),
  hours: 10,
  employee: mongoose.Types.ObjectId('63540397a5be57cf8ebf17d6'),
  project: mongoose.Types.ObjectId('635408ff26249caf8f9a98b3'),
};

const validId = '63540a1ca582999d7ae4dbff';
const notFoundId = '635408ff26249caf8f9a98b3';

describe('PUT /timesheets', () => {
  test('should modify a timesheet', async () => {
    const response = await request(app).put(`/timesheets/${validId}`).send(mockedTimesheets);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Timesheet with id ${validId} updated successfully`);
  });

  test('should not modify a timesheet because an empty field', async () => {
    const response = await request(app).put(`/timesheets/${validId}`).send(mockedEmptyTimesheets);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual('Cannot create timesheet: "description" is not allowed to be empty');
  });

  test('should not modify a timesheet because an invalid field', async () => {
    const response = await request(app).put(`/timesheets/${validId}`).send(wrongMockedTimesheets);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual('Cannot create timesheet: "date" must be a valid date');
  });

  test('should return status code 404 because id not found', async () => {
    const response = await request(app).put(`/timesheets/${notFoundId}`).send(mockedTimesheets);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Timesheet with id ${notFoundId} not found`);
  });
});

describe('DELETE /timesheets', () => {
  test('should delete timesheet', async () => {
    const response = await request(app).delete(`/timesheets/${validId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Timesheet with id ${validId} successfully deleted`);
  });

  test('should return status code 404 because id not found', async () => {
    const response = await request(app).delete(`/timesheets/${notFoundId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Timesheet with id ${notFoundId} not found`);
  });
});
