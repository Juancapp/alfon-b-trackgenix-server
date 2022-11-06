import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsControllers.getAdminById)
  .post('/', adminValidation.validateNewUser, adminsControllers.createAdmin)
  .put('/:id', adminValidation.validateUpdateUser, adminsControllers.updateAdmins)
  .delete('/:id', adminsControllers.deleteAdmins);

export default router;
