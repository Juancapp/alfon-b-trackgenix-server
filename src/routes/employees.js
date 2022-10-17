import express from 'express';
import employeesControllers from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .put('/:id', employeesValidations.validateCreation, employeesControllers.editEmployees)
  .delete('/:id', employeesControllers.deleteEmployees);

export default router;
