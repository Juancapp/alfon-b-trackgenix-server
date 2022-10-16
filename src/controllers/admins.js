import Admins from '../models/Admins';

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

export default { getAllAdmins };
