import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router
  .get('/', projectControllers.getAllProjects)
  .get('/:id', projectControllers.getProjectsById)
  .post('/', projectValidations.validateCreation, projectControllers.createProject);

export default router;
