import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeeSeeds from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeeSeeds);
});

let employeeId;
const mockedEmployee = {
  name: 'Delainey',
  lastName: 'Stirrip',
  phone: '5493425770149',
  email: 'dstirrip0@over-blog.com',
  password: 'TegK86asd',
  dni: '14703006',
};
const wrongMockedEmployee = {
  name: 'Julian',
  lastName: '',
  phone: '549',
  email: 'dstirrip.com',
  password: '2aas',
  dni: 'asdf',
};

describe('GET /employees', () => {
  test('should return all the employees', async () => {
    const response = await request(app).get('/employees').send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Employees found successfully');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  describe('GET /employees empty data', () => {
    beforeEach(async () => {
      await Employees.deleteMany();
    });
    test('Should return status code 404 with admins not found', async () => {
      const response = await request(app).get('/employees').send();

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Employees not found');
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    });
    afterEach(async () => {
      await Employees.collection.insertMany(employeeSeeds);
    });
  });
});

describe('POST /employee', () => {
  test('should create employees without error', async () => {
    const response = await request(app).post('/employees').send(mockedEmployee);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Employee created successfully');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toMatchObject({
      name: mockedEmployee.name,
      lastName: mockedEmployee.lastName,
      phone: Number(mockedEmployee.phone),
      email: mockedEmployee.email,
      password: mockedEmployee.password,
      dni: Number(mockedEmployee.dni),
    });
  });
  test('should return error with wrong data', async () => {
    const response = await request(app).post('/employees').send(wrongMockedEmployee);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "lastName" is not allowed to be empty');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  test('should return error with empty data', async () => {
    const response = await request(app).post('/employees').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('GET byId /employee', () => {
  test('should return the employee', async () => {
    const response = await request(app).get(`/employees/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Employee found successfully');
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toEqual(employeeId);
  });
  test('should return error with invalid id', async () => {
    const invalidId = 1234;
    const response = await request(app).get(`/employees/${invalidId}`).send();

    expect(response.status).toBe(400);

    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  test('should return not found error with wrong id', async () => {
    const wrongId = '6353fd0fbbfd1f6da8015fe7';
    const response = await request(app).get(`/employees/${wrongId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Employee with id ${wrongId} not found`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});
