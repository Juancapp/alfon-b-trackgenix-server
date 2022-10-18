import express from 'express';
import employeeControllers from '../controllers/employees';
import validateEmployees from '../validations/employees';

const router = express.Router();

router
  .get('/', employeeControllers.getAllEmployees)
  .get('/:id', employeeControllers.getEmployeeById)
  .post('/', validateEmployees, employeeControllers.newEmployee);

export default router;
