import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import ProjectsSeed from '../seeds/projects';
import EmployeesSedd from '../seeds/employees';
import Employees from '../models/Employees';

beforeAll(async () => {
  await Projects.collection.insertMany(ProjectsSeed);
  await Employees.collection.insertMany(EmployeesSedd);
});

const reqId = '635408ff26249caf8f9a98b3';
const badReqId = '635408ff26249caf8f9a98b3asdasd';
const notFoundId = '63540469873594f152b2ad3c';
let deleteReqError;
let deleteReqId;

const mockedProjects = {
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
      employee: '63540397a5be57cf8ebf17d6',
      role: 'DEV',
      rate: 120,
    },
  ],
};

describe('PUT /projects', () => {
  test('should return status 200', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedProjects);
    expect(response.status).toBe(200);
  });

  test('should return error false', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedProjects);
    expect(response.body.error).toBeFalsy();
  });

  test('bodys should be the same', async () => {
    const response = await request(app).put(`/projects/${reqId}`).send(mockedProjects);
    expect(response.body.data).toMatchObject(mockedIdProject);
  });

  test('should return status 400', async () => {
    const response = await request(app).put(`/projects/${badReqId}`).send(mockedProjects);
    expect(response.status).toBe(400);
  });

  test('should return error true', async () => {
    const response = await request(app).put(`/projects/${badReqId}`).send(mockedProjects);
    expect(response.body.error).toBeTruthy();
  });

  test('should return data undefined', async () => {
    const response = await request(app).put(`/projects/${badReqId}`).send(mockedProjects);
    expect(response.body.data).toBe(undefined);
  });

  test('should return status 404', async () => {
    const response = await request(app).put(`/projects/${notFoundId}`).send(mockedProjects);
    expect(response.status).toBe(404);
  });

  test('should return error true', async () => {
    const response = await request(app).put(`/projects/${notFoundId}`).send(mockedProjects);
    expect(response.body.error).toBeTruthy();
  });

  test('should return data undefined', async () => {
    const response = await request(app).put(`/projects/${notFoundId}`).send(mockedProjects);
    expect(response.body.data).toBe(undefined);
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
});

describe('DELETE /projects', () => {
  test('should return status 200', async () => {
    const response = await request(app).delete(`/projects/${reqId}`).send();
    expect(response.status).toBe(200);
    deleteReqError = response.body.error;
    // eslint-disable-next-line no-underscore-dangle
    deleteReqId = response.body.data._id;
  });

  test('should return error false', () => {
    expect(deleteReqError).toBeFalsy();
  });

  test('should return the same id as the request id', () => {
    expect(deleteReqId).toBe(reqId);
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
});
