import request from 'supertest';
import app from '../app';
import task from '../models/Tasks';
import taskSeeds from '../seeds/tasks';

beforeAll(async () => {
  await task.collection.insertMany(taskSeeds);
});

const mockedTask = {
  description: 'ultrices mattis odio donec vitae nisi nam ultrices libero',
};
const emptyMockedTask = {
  description: '',
};
const invalidMockedTask = {
};
const badMockedTask = {
  description: 'mocked',
};

const reqValidId = '635405a0ab8783392fe27376';
const reqIdNotFound = '635405a0ab8752392fe27376';
let reqId;
const badReqId = '635405a0ab8783392fe27379';
const badFormatReqId = '456456asd';

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

  test('Should return message succesfull', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.message).toBe('Tasks found successfully');
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

  test('Should return message succesfull', async () => {
    const response = await request(app).get(`/tasks/${reqId}`).send();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.message).toBe(`Task with ${response.body.data._id} found successfully`);
  });

  test('Should return status code 404', async () => {
    const response = await request(app).get(`/tasks/${badReqId}`).send();
    expect(response.status).toBe(404);
  });

  test('Should return error true', async () => {
    const response = await request(app).get(`/tasks/${badReqId}`).send();
    expect(response.status).toBeTruthy();
  });

  test('Should return data undefined', async () => {
    const response = await request(app).get(`/tasks/${badReqId}`).send();
    expect(response.body.data).toBe(undefined);
  });

  test('Should return message error', async () => {
    const response = await request(app).get(`/tasks/${badReqId}`).send();
    expect(response.body.message).toBe(`Task with id ${badReqId} not found`);
  });

  test('Should return status code 400', async () => {
    const response = await request(app).get(`/tasks/${badFormatReqId}`).send();
    expect(response.status).toBe(400);
  });

  test('Should return error true', async () => {
    const response = await request(app).get(`/tasks/${badFormatReqId}`).send();
    expect(response.status).toBeTruthy();
  });

  test('Should return status code 404', async () => {
    const response = await request(app).get(`/tasks/${badFormatReqId}`).send();
    expect(response.body.data).toBe(undefined);
  });

  test('Should return message error', async () => {
    const response = await request(app).get(`/tasks/${badFormatReqId}`).send();
    expect(response.body.message).toBe(`Task with id ${badFormatReqId} not found`);
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

  test('Should return message success', async () => {
    const response = await request(app).post('/tasks').send(mockedTask);
    expect(response.body.message).toBe('Task created successfully');
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

  test('Should return message success', async () => {
    const response = await request(app).post('/tasks').send(badMockedTask);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.message).toBe('Validation error: \"description\" length must be at least 10 characters long');
  });
});

describe('PUT /task', () => {
  test('should modify a task', async () => {
    const response = await request(app).put(`/tasks/${reqValidId}`).send(mockedTask);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Task with id ${reqValidId} updated succesfully`);
  });
  test('should not modify a task because an empty field', async () => {
    const response = await request(app).put(`/tasks/${reqValidId}`).send(emptyMockedTask);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual('Validation error: "description" is not allowed to be empty');
  });
  test('should not modify a task because a missing required field', async () => {
    const response = await request(app).put(`/tasks/${reqValidId}`).send(invalidMockedTask);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual('Validation error: "description" is required');
  });
  test('should return status code 404 because id not found', async () => {
    const response = await request(app).put(`/tasks/${reqIdNotFound}`).send(mockedTask);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Task with id ${reqIdNotFound} not found`);
  });
});

describe('DELETE /task', () => {
  test('should deleted a task', async () => {
    const response = await request(app).delete(`/tasks/${reqValidId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toEqual(`Task with id ${reqValidId} deleted succesfully`);
  });
  test('Should not delete a task', async () => {
    const response = await request(app).delete(`/tasks/${badFormatReqId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Task with id ${badFormatReqId} not found`);
  });
  test('should return status code 404', async () => {
    const response = await request(app).delete(`/tasks/${reqIdNotFound}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Task with id ${reqIdNotFound} not found`);
  });
});
