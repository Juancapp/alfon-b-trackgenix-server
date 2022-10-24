import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeeds from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeeds);
});

const invalidId = '6354039c6d5cab252b86b588Nvalid';
const validId = '6354039c6d5cab252b86b580';
const notFoundId = '6354039c6d5cab252b86b588';

const mockedEmployee = {
  name: 'test',
  lastName: 'test',
  phone: '123456789',
  email: 'test@test.com',
  password: 'abcd1234',
  dni: '1234567',
};

const incompleteEmployee = {
  name: 'test',
  lastName: 'test',
  phone: '123456789',
  email: 'test@test.com',
  password: 'abcd1234',
};

const badEmployee = {
  name: 'te',
  lastName: 'test',
  phone: '123456789',
  email: 'test@test.com',
  password: 'abcd1234',
  dni: '1234567',
};

describe('PUT /employees', () => {
  test('Should update employee', async () => {
    const response = await request(app).put(`/employees/${validId}`).send(mockedEmployee);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Employee with id ${validId} updated successfully`);
    expect(response.body.data).toBeDefined();
  });
  test('Should not update an admin because all fields are required', async () => {
    const response = await request(app).put(`/employees/${validId}`).send(incompleteEmployee);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });
  test('Should not update an admin because the body data is not valid', async () => {
    const response = await request(app).put(`/employees/${validId}`).send(badEmployee);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
  });
  test('Should return bad request', async () => {
    const response = await request(app).put(`/employees/${notFoundId}`).send(mockedEmployee);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Employee with id ${notFoundId} not found`);
    expect(response.body.data).toBeUndefined();
  });
  test('Should not be valid', async () => {
    const response = await request(app).put(`/employees/${invalidId}`).send(mockedEmployee);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Employee id ${invalidId} not valid`);
    expect(response.body.data).toBeUndefined();
  });
});

describe('DELETE /employees', () => {
  test('Should delete an employee', async () => {
    const response = await request(app).delete(`/employees/${validId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Employee deleted succesfully');
    expect(response.body.data).toBeDefined();
  });
  test('Should return bad request', async () => {
    const response = await request(app).delete(`/employees/${notFoundId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Employee with id ${notFoundId} not found`);
    expect(response.body.data).toBeUndefined();
  });
  test('Should not be valid', async () => {
    const response = await request(app).put(`/employees/${invalidId}`).send(mockedEmployee);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Employee id ${invalidId} not valid`);
    expect(response.body.data).toBeUndefined();
  });
});
