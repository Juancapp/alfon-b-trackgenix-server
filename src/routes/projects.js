import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), projectsControllers.getAllProjects)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), projectsControllers.getProjectsById)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN', 'ADMIN']),
    projectsValidations.validateCreation,
    projectsControllers.createProject,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    projectsValidations.validateCreation,
    projectsControllers.updateProject,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), projectsControllers.deleteProject);

export default router;
