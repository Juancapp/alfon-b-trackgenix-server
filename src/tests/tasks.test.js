import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});

const mockedTask = {
  description: 'mocked task for testing',
};
const badMockedTask = {
  description: 'mocked',
};
let reqId;
const badReqId = '635405a0ab8783392fe27379';

describe('GET /tasks', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/tasks').send();
    // eslint-disable-next-line no-underscore-dangle
    reqId = response.body.data[0]._id;
    expect(response.status).toBe(200);
  });

  test('Should return error false', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.error).toBeFalsy();
  });

  test('Should return 1 or more tasks', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GETbyID /tasks', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get(`/tasks/${reqId}`).send();
    expect(response.status).toBe(200);
  });

  test('Should return error false', async () => {
    const response = await request(app).get(`/tasks/${reqId}`).send();
    expect(response.body.error).toBeFalsy();
  });

  test('Should return 1 task', async () => {
    const response = await request(app).get(`/tasks/${reqId}`).send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toContain(reqId);
  });

  test('Should return status code 404', async () => {
    const response = await request(app).get(`/tasks/${badReqId}`).send();
    expect(response.status).toBe(404);
  });

  test('Should return errror true', async () => {
    const response = await request(app).get(`/tasks/${badReqId}`).send();
    expect(response.status).toBeTruthy();
  });

  test('Should return data undefined', async () => {
    const response = await request(app).get(`/tasks/${badReqId}`).send();
    expect(response.body.data).toBe(undefined);
  });
});

describe('POST /tasks', () => {
  test('Should return status code 201', async () => {
    const response = await request(app).post('/tasks').send(mockedTask);
    expect(response.status).toBe(201);
  });

  test('Should return error false', async () => {
    const response = await request(app).post('/tasks').send(mockedTask);
    expect(response.body.error).toBeFalsy();
  });

  test('Should return tasks created', async () => {
    const response = await request(app).post('/tasks').send(mockedTask);
    expect(response.body.data.description).toContain(mockedTask.description);
  });

  test('Should return status code 400', async () => {
    const response = await request(app).post('/tasks').send(badMockedTask);
    expect(response.status).toBe(400);
  });

  test('Should return error true', async () => {
    const response = await request(app).post('/tasks').send(badMockedTask);
    expect(response.body.error).toBeTruthy();
  });

  test('Should return task undefined', async () => {
    const response = await request(app).post('/tasks').send(badMockedTask);
    expect(response.body.data).toBe(undefined);
  });
});
