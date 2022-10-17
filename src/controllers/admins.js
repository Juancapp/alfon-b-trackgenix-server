import Admins from '../models/Admins';

const deleteAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admins.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Admin deleted',
      data: admins,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error ocurred',
      error: err,
    });
  }
};

const updateAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admins.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: 'Admin updated',
      data: admins,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error ocurred',
      error: err,
    });
  }
};

export default { deleteAdmins, updateAdmins };
