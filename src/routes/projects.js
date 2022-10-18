import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router
  .get('/', projectControllers.projects)
  .get('/:id', projectControllers.getProjectsById)
  .post('/', projectValidations.validateCreation, projectControllers.newProject);

export default router;
