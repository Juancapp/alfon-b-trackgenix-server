import mongoose from 'mongoose';
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
    const newAdmin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
      phone: req.body.phone,
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
export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
};
