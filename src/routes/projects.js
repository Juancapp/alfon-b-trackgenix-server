import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router.delete('/:id', projectsControllers.deleteProject);
router.put('/', projectsControllers.updateProject, projectsValidations.validateUpdate);

export default router;
