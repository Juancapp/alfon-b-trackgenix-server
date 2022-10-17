import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .put('/:id', tasksValidations.validateTask, tasksControllers.updateTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;
