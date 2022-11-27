import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), adminsControllers.getAllAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), adminsControllers.getAdminById)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN']),
    adminValidation.validateNewUser,
    adminsControllers.createAdmin,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN']),
    adminValidation.validateUpdateUser,
    adminsControllers.updateAdmins,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN']), adminsControllers.deleteAdmins);

export default router;
