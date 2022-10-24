import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeeds from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeeds);
});

const mockedEmployee = {
  name: 'test',
  last_name: 'test',
  phone: '123456789',
  email: 'test@test.com',
  password: 'abcd1234',
  dni: '1234567',
};

describe('DELETE /employees', () => {
  test('Should delete an employee', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const employeeId = employeesSeeds[0]._id;
    const response = await request(app).delete(`/employees/${employeeId}`).send();

    expect(response.status).toBe(200);
  });
});

describe('PUT /employees', () => {
  test('Should update employee', async () => {
    const employeeId = mongoose.Types.ObjectId('6354039c6d5cab252b86b580');
    const response = await request(app).put(`/employees/${employeeId}`).send(mockedEmployee);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Employee with id ${employeeId} updated successfully`);
    expect(response.body.data).toBeDefined();
  });
  test('Should return bad request', async () => {
    const employeeId = mongoose.Types.ObjectId('6354039c6d5cab252b86b588');
    const response = await request(app).put(`/employees/${employeeId}`).send(mockedEmployee);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Employee with id ${employeeId} not found`);
  });
});

// describe('example', () => {
//   it('Test', () => {
//     expect(true).toEqual(true);
//   });
// });
