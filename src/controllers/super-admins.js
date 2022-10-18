import mongoose from 'mongoose';
import SuperAdmin from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const result = await SuperAdmin.find();

    return res.status(200).json({
      message: 'SuperAdmins found successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: `SuperAdmins not found ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: `Cannot get superAdmin by ${id}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const result = await SuperAdmin.findById(id);
    if (result) {
      return res.status(200).json({
        message: 'SuperAdmin found successfully',
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

const createSuperAdmin = async (req, res) => {
  try {
    const newSuperAdmin = new SuperAdmin({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
      phone: req.body.phone,
    });

    const result = await newSuperAdmin.save();

    return res.status(201).json({
      message: 'SuperAdmin created successfully',
      data: result,
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

export default {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
};
