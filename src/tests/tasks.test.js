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

const reqValidId = '635405a0ab8783392fe27376';
const reqIdNotFound = '635405a0ab8783392ro27376';

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
  test('should return status code 404 because id not found', async () => {
    const response = await request(app).delete(`/tasks/${reqIdNotFound}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBe(undefined);
    expect(response.body.message).toEqual(`Task with id ${reqIdNotFound} not found`);
  });
});
