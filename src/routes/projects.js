import express from 'express';
import projectControllers from '../controllers/projects';

const router = express.Router();

router
  .get('/', projectControllers.getAllProjects)
  .get('/:id', projectControllers.getProjectsById);

export default router;
