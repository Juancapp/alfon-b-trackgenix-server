import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import { validateSuperAdmin, updateSuperAdmin } from '../validations/super-admins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getAllSuperAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getSuperAdminById)
  .get('/fuid/:firebaseUid', checkAuth(['SUPER_ADMIN']), superAdminsControllers.getSuperAdminByFireBaseUid)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN']),
    validateSuperAdmin,
    superAdminsControllers.createSuperAdmin,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN']),
    updateSuperAdmin,
    superAdminsControllers.updateSuperAdmin,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN']), superAdminsControllers.deleteSuperAdmin);

export default router;
