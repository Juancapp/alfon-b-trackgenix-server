import Admins from '../models/Admins';

const { ObjectId } = require('mongoose').Types;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) { return true; }
    return false;
  }
  return false;
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();

    return res.status(200).json({
      message: 'Admins found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};
const getAdminById = async (req, res) => {
  if (isValidObjectId(req.param.id)) {
    return res.status(400).json({
      message: 'Invalid ID',
      error: true,
    });
  }
  try {
    const admin = await Admins.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        msg: 'ID existe',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Admin no found',
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'ERROR',
      error,
    });
  }
};
const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dni: req.body.dni,
      phone: req.body.phone,
    });

    const result = await admin.save();
    return res.status(200).json({
      message: 'Admin created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};
export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
};
