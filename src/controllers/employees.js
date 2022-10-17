import employees from '../models/Employees';

const editEmployees = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await employees.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true },
      );

      return res.status(200).json({
        message: `Employee with id ${id} edited`,
        data: result,
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An error ocurred',
        error,
      });
    }
  };


const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employees.findByIdAndDelete(id);
    return res.status(204).json({
      message: `Employee with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: true,
    });
  }
};

export default {
    editEmployees,
    deleteEmployees,
};
