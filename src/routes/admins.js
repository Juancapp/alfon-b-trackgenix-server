import express from 'express';
import adminsControllers from '../controllers/admins';
import adminsValidations from '../validations/admins';

const router = express.Router();

router
  .delete('/:id', adminsControllers.deleteAdmins)
  .put('/:id', adminsValidations.validateUpdate, adminsControllers.updateAdmins);

export default router;
