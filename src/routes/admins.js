import express from 'express';
import adminsControllers from '../controllers/admins';
import { validateNewUser, validateUpdateUser } from '../validations/admins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminsControllers.getAllAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminsControllers.getAdminById)
  .get('/fuid/:firebaseUid', checkAuth(['SUPER_ADMIN', 'ADMIN']), adminsControllers.getAdminByFireBaseUid)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN']),
    validateNewUser,
    adminsControllers.createAdmin,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN']),
    validateUpdateUser,
    adminsControllers.updateAdmins,
  )

  .put(
    '/profile/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN']),
    validateUpdateUser,
    adminsControllers.updateAdminsMyProfile,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN']), adminsControllers.deleteAdmins);

export default router;
