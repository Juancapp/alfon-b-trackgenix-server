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

let employeeId;

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

  test('should return status code 404 with employees not found', async () => {
    await Employees.deleteMany();
    const response = await request(app).get('/employees').send();

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Employees not found');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  afterAll(async () => {
    await Employees.collection.insertMany(employeesSeeds);
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
  test('should return successfully the employee when passed in a valid id', async () => {
    const response = await request(app).get(`/employees/${employeeId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Employee found successfully');
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toEqual(employeeId);
  });
  test('should return invalid id error message when passed in an invalid id', async () => {
    const invalidGetId = 1234;
    const response = await request(app).get(`/employees/${invalidGetId}`).send();

    expect(response.status).toBe(400);

    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return not found error message when passed in a wrong id', async () => {
    const wrongId = '6353fd0fbbfd1f6da8015fe7';
    const response = await request(app).get(`/employees/${wrongId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Employee with id ${wrongId} not found`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

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
    expect(response.body.message).toBeDefined();
  });
  test('Should not update an admin because the body data is not valid', async () => {
    const response = await request(app).put(`/employees/${validId}`).send(badEmployee);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toBeDefined();
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
  test('Should fail because of non-existent id', async () => {
    const response = await request(app).delete(`/employees/${notFoundId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Employee with id ${notFoundId} not found`);
    expect(response.body.data).toBeUndefined();
  });
  test('Should not be valid', async () => {
    const response = await request(app).delete(`/employees/${invalidId}`).send(mockedEmployee);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Employee id ${invalidId} not valid`);
    expect(response.body.data).toBeUndefined();
  });
});
