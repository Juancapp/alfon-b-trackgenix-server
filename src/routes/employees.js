import express from 'express';
import employeeControllers from '../controllers/employees';
import { validateEmployees, validateUpdateEmployee } from '../validations/employees';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), employeeControllers.getAllEmployees)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), employeeControllers.getEmployeeById)
  .get('/fuid/:firebaseUid', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), employeeControllers.getEmployeeByFireBaseUid)
  .post(
    '/',
    validateEmployees,
    employeeControllers.createEmployee,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN']),
    validateUpdateEmployee,
    employeeControllers.updateEmployee,
  )
  .put(
    '/profile/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    validateUpdateEmployee,
    employeeControllers.updateEmployeeMyProfile,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), employeeControllers.deleteEmployee);

export default router;
