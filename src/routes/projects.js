import express from 'express';
import projectsControllers from '../controllers/projects';

const router = express.Router();

router.delete('/:id', projectsControllers.deleteProject);
router.put('/', projectsControllers.updateProject);

export default router;
