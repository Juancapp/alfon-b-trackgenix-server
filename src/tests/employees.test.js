import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

let employeeId;

describe('DELETE /employees', () => {
  test('Should delete an employee', async () => {
    const response = await request(app).delete(`/employees/${employeeId}`).send();
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;
    expect(response.status).toBe(200);
  });
});

// describe('example', () => {
//   it('Test', () => {
//     expect(true).toEqual(true);
//   });
// });
