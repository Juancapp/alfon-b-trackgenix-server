import express from 'express';
import employeesControllers from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .put('/:id', employeesValidations.validateCreation, employeesControllers.updatedEmployee)
  .delete('/:id', employeesControllers.deletedEmployee);

export default router;
