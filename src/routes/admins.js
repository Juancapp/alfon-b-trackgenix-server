import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router.get('/', adminsControllers.getAllAdmins);
router.get('/:id', adminsControllers.getAdminById);
router.post('/', adminValidation.validateAdmin, adminsControllers.createAdmin);

export default router;
