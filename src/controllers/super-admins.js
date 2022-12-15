import mongoose from 'mongoose';
import SuperAdmins from '../models/Super-admins';
import firebase from '../helpers/firebase';

const getAllSuperAdmins = async (req, res) => {
  try {
    const result = await SuperAdmins.find();
    if (result.length) {
      return res.status(200).json({
        message: 'SuperAdmins found successfully',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'SuperAdmins not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: `Cannot get SuperAdmins by ${id}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const result = await SuperAdmins.findById(id);
    if (result) {
      return res.status(200).json({
        message: 'SuperAdmins found successfully',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: `SuperAdmin with id ${id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminByFireBaseUid = async (req, res) => {
  const superAdminFirebaseUid = req.params.firebaseUid;
  try {
    const superAdmin = await SuperAdmins.find({ firebaseUid: superAdminFirebaseUid });
    if (superAdmin) {
      return res.status(200).json({
        message: 'Super Admin found successfully',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Employee with id ${superAdminFirebaseUid} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const findByEmail = await SuperAdmins.find({ email: req.body.email });
    if (findByEmail.length > 0) {
      return res.status(400).json({
        message: 'There is already a super admin with that email',
        data: undefined,
        error: true,
      });
    }

    const findByDni = await SuperAdmins.find({ dni: req.body.dni });
    if (findByDni.length > 0) {
      return res.status(400).json({
        message: 'There is already a super admin with that DNI',
        data: undefined,
        error: true,
      });
    }
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER_ADMIN' });

    const newSuperAdmins = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      dni: req.body.dni,
      phone: req.body.phone,
      firebaseUid: newFirebaseUser.uid,
    });

    const createdSuperAdmins = await newSuperAdmins.save();

    return res.status(201).json({
      message: 'SuperAdmin created successfully',
      data: createdSuperAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Super Admin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const updatedSuperAdmins = await SuperAdmins.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    );

    if (updatedSuperAdmins) {
      await firebase.auth().updateUser(updatedSuperAdmins.firebaseUid, {
        email: req.body.email,
        password: req.body.password,
      });

      return res.status(200).json({
        message: `Super Admin with id ${req.params.id} updated successfully`,
        data: updatedSuperAdmins,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Super Admin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `SuperAdmins with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const findSuperAdminById = await SuperAdmins.findById(req.params.id);
    if (findSuperAdminById) {
      await firebase.auth().deleteUser(findSuperAdminById.firebaseUid);
      const deletedSuperAdmin = await SuperAdmins.findByIdAndDelete(req.params.id);

      if (deletedSuperAdmin) {
        return res.status(204).json();
      }
    }

    return res.status(404).json({
      message: `SuperAdmins with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminById,
  getSuperAdminByFireBaseUid,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
