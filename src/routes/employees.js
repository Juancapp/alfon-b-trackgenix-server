import express from 'express';
import { getAllEmployees, getEmployeeById } from '../controllers/employees';

const router = express.Router();

router
  .get('/', getAllEmployees)
  .get('/:id', getEmployeeById);

export default router;
