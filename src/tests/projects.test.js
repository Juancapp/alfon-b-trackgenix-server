import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import Projects from '../models/Projects';
import projectSeeds from '../seeds/projects';
import employeeSeeds from '../seeds/employees';

beforeAll(async () => {
  await Projects.collection.insertMany(projectSeeds);
  await Employees.collection.insertMany(employeeSeeds);
});

let projectId;
const reqId = '635408ff26249caf8f9a98b3';
const badReqId = '635408ff26249caf8f9a98b3asdasd';
const notFoundId = '63540469873594f152b2ad3c';

const mockedProject = {
  name: 'Calley',
  startDate: '2021-03-30T03:00:00.000Z',
  endDate: '2022-09-28T03:00:00.000Z',
  description: 'non mauris morbi non lectus aliquam sit amet',
  clientName: 'Caitrin',
  active: true,
  employees: [
    {
      employee: '63540397a5be57cf8ebf17d6',
      role: 'DEV',
      rate: 120,
    },
  ],
};
const mockedBadProject = {
  name: '',
  startDate: '3/30/2021',
  endDate: '9/28/2022',
  description: 'non mauris morbi non lectus aliquam sit amet',
  clientName: 'Caitrin',
  active: true,
  employees: [
    {
      employee: '63540397a5be57cf8ebf17d6',
      role: 'DEV',
      rate: 120,
    },
  ],
};
const mockedIdProject = {
  _id: '635408ff26249caf8f9a98b3',
  name: 'Calley',
  startDate: '2021-03-30T03:00:00.000Z',
  endDate: '2022-09-28T03:00:00.000Z',
  description: 'non mauris morbi non lectus aliquam sit amet',
  clientName: 'Caitrin',
  active: true,
  employees: [
    {
      employee: {
        _id: '63540397a5be57cf8ebf17d6',
        dni: 14703006,
        email: 'dstirrip0@over-blog.com',
        lastName: 'Stirrip',
        name: 'Delainey',
        password: 'TegK86',
        phone: 5493425770149,
      },
      rate: 120,
      role: 'DEV',
    }],
};

describe('GET /projects', () => {
  test('should return all the projects', async () => {
    const response = await request(app).get('/projects').send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Projects found successfully');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('should return project employees', async () => {
    const response = await request(app).get('/projects').send();

    expect(response.body.data[0].employees.length).toBeGreaterThan(0);
  });
  test('should return project employee data', async () => {
    const response = await request(app).get('/projects').send();

    expect(response.body.data[0].employees[0]).not.toBe(null);
  });

  test('should return status code 404 with projects not found', async () => {
    await Projects.deleteMany();
    const response = await request(app).get('/projects').send();

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Projects not found');
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  afterAll(async () => {
    await Projects.collection.insertMany(projectSeeds);
  });
});

describe('POST /employee', () => {
  test('should create projects without error', async () => {
    const response = await request(app).post('/projects').send(mockedProject);
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Project created successfully');
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toMatchObject({
      name: mockedProject.name,
      startDate: mockedProject.startDate,
      endDate: mockedProject.endDate,
      description: mockedProject.description,
      clientName: mockedProject.clientName,
      active: mockedProject.active,
      employees: mockedProject.employees,
    });
  });

  test('should return error with wrong data', async () => {
    const response = await request(app).post('/projects').send(mockedBadProject);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "name" is not allowed to be empty');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return error with empty data', async () => {
    const response = await request(app).post('/projects').send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: "name" is required');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('GET byId /projects', () => {
  test('should return successfully the project when passed in a valid id', async () => {
    const response = await request(app).get(`/projects/${projectId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Project with id ${projectId} found successfully`);
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toEqual(projectId);
  });
  test('should return project employees', async () => {
    const response = await request(app).get(`/projects/${projectId}`);

    expect(response.body.data.employees.length).toBeGreaterThan(0);
  });
  test('should return project employee data', async () => {
    const response = await request(app).get(`/projects/${projectId}`);

    expect(response.body.data.employees[0]).not.toBe(null);
  });

  test('should return invalid id error message when passed in an invalid id', async () => {
    const invalidId = 1234;
    const response = await request(app).get(`/projects/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Cannot get project by ${invalidId}`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });

  test('should return not found error message when passed in a wrong id', async () => {
    const wrongId = '6353fd0fbbfd1f6da8015fe7';
    const response = await request(app).get(`/projects/${wrongId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Project with Id ${wrongId} not found`);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});
describe('PUT /projects', () => {
  test('should return status 200', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedProject);
    expect(response.status).toBe(200);
  });

  test('should return error false', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedProject);
    expect(response.body.error).toBeFalsy();
  });

  test('bodys should be the same', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedProject);
    expect(response.body.data).toMatchObject(mockedIdProject);
  });

  test('check for success message', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedProject);
    expect(response.body.message).toEqual(`Project with id ${reqId} updated successfully`);
  });

  test('should return status 400', async () => {
    const response = await request(app).put(`/projects/${badReqId}`).send(mockedProject);
    expect(response.status).toBe(400);
  });

  test('should return error true', async () => {
    const response = await request(app).put(`/projects/${badReqId}`).send(mockedProject);
    expect(response.body.error).toBeTruthy();
  });

  test('should return data undefined', async () => {
    const response = await request(app).put(`/projects/${badReqId}`).send(mockedProject);
    expect(response.body.data).toBe(undefined);
  });

  test('check for not found message', async () => {
    const response = await request(app).put(`/projects/${badReqId}`).send(mockedProject);
    expect(response.body.message).toEqual(`Project with id ${badReqId} not found`);
  });

  test('should return status 404', async () => {
    const response = await request(app).put(`/projects/${notFoundId}`).send(mockedProject);
    expect(response.status).toBe(404);
  });

  test('should return error true', async () => {
    const response = await request(app).put(`/projects/${notFoundId}`).send(mockedProject);
    expect(response.body.error).toBeTruthy();
  });

  test('should return data undefined', async () => {
    const response = await request(app).put(`/projects/${notFoundId}`).send(mockedProject);
    expect(response.body.data).toBe(undefined);
  });

  test('check for not found message', async () => {
    const response = await request(app).put(`/projects/${notFoundId}`).send(mockedProject);
    expect(response.body.message).toEqual(`Project with id ${notFoundId} not found`);
  });

  test('should return status 400', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedBadProject);
    expect(response.status).toBe(400);
  });

  test('should return error true', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedBadProject);
    expect(response.body.error).toBeTruthy();
  });

  test('should return data undefined', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedBadProject);
    expect(response.body.data).toBe(undefined);
  });

  test('check for not found message', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedBadProject);
    expect(response.body.message).toBeDefined();
  });
});

describe('DELETE /projects', () => {
  test('should return status 200', async () => {
    const response = await request(app).delete(`/projects/${reqId}`).send();
    expect(response.status).toBe(204);
  });

  test('should return status 404', async () => {
    const response = await request(app).delete(`/projects/${notFoundId}`).send();
    expect(response.status).toBe(404);
  });

  test('should return error true', async () => {
    const response = await request(app).delete(`/projects/${notFoundId}`).send();
    expect(response.body.error).toBeTruthy();
  });

  test('should return data undefined', async () => {
    const response = await request(app).delete(`/projects/${notFoundId}`).send();
    expect(response.body.data).toBe(undefined);
  });

  test('check for not found message', async () => {
    const response = await request(app).delete(`/projects/${notFoundId}`).send();
    expect(response.body.message).toEqual(`Project with id ${notFoundId} not found`);
  });

  test('should return status 400', async () => {
    const response = await request(app).delete(`/projects/${badReqId}`).send();
    expect(response.status).toBe(400);
  });

  test('should return error true', async () => {
    const response = await request(app).delete(`/projects/${badReqId}`).send();
    expect(response.body.error).toBeTruthy();
  });

  test('should return data undefined', async () => {
    const response = await request(app).delete(`/projects/${badReqId}`).send();
    expect(response.body.data).toBe(undefined);
  });

  test('check for not found message', async () => {
    const response = await request(app).delete(`/projects/${badReqId}`).send(mockedBadProject);
    expect(response.body.message).toBeDefined();
  });
});
