import express from 'express';
import employeeControllers from '../controllers/employees';
import validateEmployees from '../validations/employees';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), employeeControllers.getAllEmployees)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), employeeControllers.getEmployeeById)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    validateEmployees.validateEmployees,
    employeeControllers.createEmployee,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    validateEmployees.validateEmployees,
    employeeControllers.updateEmployee,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), employeeControllers.deleteEmployee);

export default router;
