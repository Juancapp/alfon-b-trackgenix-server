import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getAllSuperAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getSuperAdminById)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN']),
    superAdminsValidations.validateSuperAdmin,
    superAdminsControllers.createSuperAdmin,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN']),
    superAdminsValidations.updateSuperAdmin,
    superAdminsControllers.updateSuperAdmin,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControllers.deleteSuperAdmin);

export default router;
