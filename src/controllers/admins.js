import mongoose from 'mongoose';
import firebase from '../helpers/firebase';
import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();

    if (!admins.length) {
      return res.status(404).json({
        message: 'Admins not found',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Admins found successfully',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Cannot get Admin by ${req.params.id}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const admin = await Admins.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        message: `Admin with id ${req.params.id} found successfully`,
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with id ${req.params.id} not found`,
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

const createAdmin = async (req, res) => {
  try {
    const findByEmail = await Admins.find({ email: req.body.email });
    if (findByEmail.length > 0) {
      return res.status(400).json({
        message: 'There is already an admin with that email',
        data: undefined,
        error: true,
      });
    }

    const findByDni = await Admins.find({ dni: req.body.dni });
    if (findByDni.length > 0) {
      return res.status(400).json({
        message: 'There is already an admin with that DNI',
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
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const newAdmin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      dni: req.body.dni,
      phone: req.body.phone,
      firebaseUid: newFirebaseUser.uid,
    });

    const result = await newAdmin.save();

    return res.status(201).json({
      message: 'Admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateAdmins = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Admin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const updatedAdmin = await Admins.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    );

    if (updatedAdmin) {
      await firebase.auth().updateUser(updatedAdmin.firebaseUid, {
        email: req.body.email,
        password: req.body.password,
      });

      return res.status(200).json({
        message: `Admin with id ${req.params.id} updated successfully`,
        data: updatedAdmin,
        error: false,
      });
    }

    return res.status(404).json({
      message: `Admin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      data: undefined,
      error: true,
    });
  }
};

const deleteAdmins = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Admin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const findAdminById = await Admins.findById(req.params.id);
    if (findAdminById) {
      await firebase.auth().deleteUser(findAdminById.firebaseUid);
      const deletedAdmin = await Admins.findByIdAndDelete(req.params.id);

      if (deletedAdmin) {
        return res.status(204).json();
      }
    }

    return res.status(404).json({
      message: `Admin with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmins,
  deleteAdmins,
};
