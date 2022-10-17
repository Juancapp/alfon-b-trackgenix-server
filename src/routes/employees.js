import express from 'express';
import employeesControllers from '../controllers/employees'

const router = express.Router();

router
    /* .put('/:id', employeesControllers) */
    .delete('/:id', employeesControllers.deleteEmployees);

export default router;