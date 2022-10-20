import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router
  .get('/', projectsControllers.getAllProjects)
  .get('/:id', projectsControllers.getProjectsById)
  .post('/', projectsValidations.validateCreation, projectsControllers.createProject)
  .put('/:id', projectsValidations.validateCreation, projectsControllers.updateProject)
  .delete('/:id', projectsControllers.deleteProject);

export default router;
