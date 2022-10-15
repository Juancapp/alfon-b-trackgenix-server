import express from 'express';
import { createEmployee, getAllEmployees, getEmployeeById } from '../controllers/employees';
import validateEmployees from '../validations/employees';

const router = express.Router();

router
  .get('/', getAllEmployees)
  .get('/:id', getEmployeeById)
  .post('/', validateEmployees, createEmployee);

export default router;
