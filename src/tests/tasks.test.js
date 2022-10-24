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
const reqIdNotFound = '6355d9a4f45b78874ffa7e76';

describe('PUT /task', () => {
  test('should modify a task', async () => {
    const response = await request(app).put(`/tasks/${reqValidId}`).send(mockedTask);
    expect(response.status).toBe(200);
  });
  test('should not modify a task because an empty field', async () => {
    const response = await request(app).put(`/tasks/${reqValidId}`).send(emptyMockedTask);
    expect(response.status).toBe(400);
  });
  test('should not modify a task because a missing required field', async () => {
    const response = await request(app).put(`/tasks/${reqValidId}`).send(invalidMockedTask);
    expect(response.status).toBe(400);
  });
  test('should fail because id not found', async () => {
    const response = await request(app).put(`/tasks/${reqIdNotFound}`).send();
    expect(response.status).toBe(400); // deberia ser 404
  });
});

describe('DELETE /task', () => {
  test('should deleted a task', async () => {
    const response = await request(app).delete(`/tasks/${reqValidId}`).send();
    expect(response.status).toBe(200);
  });
  test('should fail because id not found', async () => {
    const response = await request(app).put(`/tasks/${reqIdNotFound}`).send();
    expect(response.status).toBe(400); // deberia ser 404
  });
});
