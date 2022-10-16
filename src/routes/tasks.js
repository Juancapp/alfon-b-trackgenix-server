import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .post('/', tasksValidations.validateTask, tasksControllers.createTask)
  .get('/', tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTasksById)
  .put('/', tasksValidations.validateTask, tasksControllers.updateTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;
