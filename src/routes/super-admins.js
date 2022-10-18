import express from 'express';
import superAdminsControllers from '../controllers/super-admins';
import superAdminsValidations from '../validations/super-admins';

const router = express.Router();

router
  .delete('/:id', superAdminsControllers.deleteSuperAdmin)
  .put('/:id', superAdminsValidations.validateUpdate, superAdminsControllers.updateSuperAdmin);

export default router;
