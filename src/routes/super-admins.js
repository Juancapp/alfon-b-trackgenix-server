import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminsControllers.getAllSuperAdmins)
  .get('/:id', superAdminsControllers.getSuperAdminById)
  .post('/', superAdminsValidations.validateCreate, superAdminsControllers.createSuperAdmin);

export default router;
