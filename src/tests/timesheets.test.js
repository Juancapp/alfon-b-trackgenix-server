import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import Timesheets from '../models/Timesheets';
import timesheetsSeeds from '../seeds/timesheets';
import Tasks from '../models/Tasks';
import Employees from '../models/Employees';
import Projects from '../models/Projects';
import tasksSeeds from '../seeds/tasks';
import employeesSeeds from '../seeds/employees';
import projectsSeeds from '../seeds/projects';

beforeAll(async () => {
  await Timesheets.collection.insertMany(timesheetsSeeds);
  await Tasks.collection.insertMany(tasksSeeds);
  await Employees.collection.insertMany(employeesSeeds);
  await Projects.collection.insertMany(projectsSeeds);
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

const notFoundId = '635408ff26249caf8f9a98b3';
const invalidId = 'homero';

// eslint-disable-next-line no-underscore-dangle
const timesheetId = timesheetsSeeds[0]._id;
const wrongMockedTimesheet = {
  description: 'auctors',
  date: '14/09/2021',
  task: '6354059cd8bf9864098d13c9',
  hours: '23',
  employee: '63540397a5be57cf8ebf17d6',
  project: '635408ff26249caf8f9a98b3',
};
const mockedTimesheet = {
  description: 'auctors sed triseque in tempus sit amex sem fusco',
  date: '12/26/2020',
  // eslint-disable-next-line no-underscore-dangle
  task: mongoose.Types.ObjectId(tasksSeeds[0]._id),
  hours: 10,
  // eslint-disable-next-line no-underscore-dangle
  employee: mongoose.Types.ObjectId(employeesSeeds[0]._id),
  // eslint-disable-next-line no-underscore-dangle
  project: mongoose.Types.ObjectId(projectsSeeds[0]._id),
};

describe('GET /timesheets', () => {
  test('should return all the timesheets', async () => {
    const response = await request(app).get('/timesheets').send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Timesheets found successfully');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0].task).not.toBeNull();
    expect(response.body.data[0].employee).not.toBeNull();
    expect(response.body.data[0].project).not.toBeNull();
  });

  test('should return status code 404 with admins not found', async () => {
    await Timesheets.deleteMany();
    const response = await request(app).get('/timesheets').send();

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Timesheets not found');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();

    await Timesheets.collection.insertMany(timesheetsSeeds);
  });
});

describe('GET byId /timesheets/:id', () => {
  test('should return the timesheet', async () => {
    const response = await request(app).get(`/timesheets/${timesheetId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Timesheet with id ${timesheetId.toString()} found successfully`);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toEqual(`${timesheetId}`);
    expect(response.body.data.task).not.toBeNull();
    expect(response.body.data.employee).not.toBeNull();
    expect(response.body.data.project).not.toBeNull();
  });

  test('should return error with invalid id', async () => {
    const response = await request(app).get(`/timesheets/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Cannot get timesheet by id of ${invalidId}`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return not found error with wrong id', async () => {
    const response = await request(app).get(`/timesheets/${notFoundId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Timesheet with id ${notFoundId} not found`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('POST /timesheet', () => {
  test('should create timesheets without error', async () => {
    const response = await request(app).post('/timesheets').send(mockedTimesheet);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Timesheet created successfully.');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.task).not.toBeNull();
    expect(response.body.data.employee).not.toBeNull();
    expect(response.body.data.project).not.toBeNull();
  });

  test('Wrong data should not be sent', async () => {
    const response = await request(app).post('/timesheets').send(wrongMockedTimesheet);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBe('There was an error: "description" length must be at least 20 characters long');
  });

  test('Empty data should not be sent', async () => {
    const response = await request(app).post('/timesheets').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "description" is required');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('PUT /timesheets', () => {
  test('should modify a timesheet', async () => {
    const response = await request(app).put(`/timesheets/${timesheetId}`).send(mockedTimesheets);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Timesheet with id ${timesheetId} updated successfully`);
  });

  test('should not modify a timesheet because an empty field', async () => {
    const response = await request(app).put(`/timesheets/${timesheetId}`).send(mockedEmptyTimesheets);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual('There was an error: "description" is not allowed to be empty');
  });

  test('should not modify a timesheet because an invalid field', async () => {
    const response = await request(app).put(`/timesheets/${timesheetId}`).send(wrongMockedTimesheets);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual('There was an error: "date" must be a valid date');
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
    const response = await request(app).delete(`/timesheets/${timesheetId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Timesheet with id ${timesheetId} successfully deleted`);
  });

  test('should not delete a timesheet', async () => {
    const response = await request(app).delete(`/timesheets/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Timesheet with id ${invalidId} not found`);
  });

  test('should return status code 404 because id not found', async () => {
    const response = await request(app).delete(`/timesheets/${notFoundId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Timesheet with id ${notFoundId} not found`);
  });
});
