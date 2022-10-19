import express from 'express';
import employeesControllers from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .put('/:id', employeesValidations.validateCreation, employeesControllers.updateEmployee)
  .delete('/:id', employeesControllers.deleteEmployee);

export default router;
