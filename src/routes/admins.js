import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsControllers.getAdminById)
  .post('/', adminValidation.validateAdmin, adminsControllers.createAdmin)
  .put('/:id', adminValidation.validateAdmin, adminsControllers.updateAdmins)
  .delete('/:id', adminsControllers.deleteAdmins);

export default router;
