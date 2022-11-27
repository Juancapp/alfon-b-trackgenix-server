import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), tasksControllers.getAllTasks)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), tasksControllers.getTasksById)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    tasksValidations.validateTask,
    tasksControllers.createTask,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    tasksValidations.validateTask,
    tasksControllers.updateTask,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), tasksControllers.deleteTask);

export default router;
