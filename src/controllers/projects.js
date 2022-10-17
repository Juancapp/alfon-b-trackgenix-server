import Projects from '../models/Projects';

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );

    return res.status(200).json({
      message: 'The project has been updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `There has been an error: ${error}`,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'The project has been deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `There has been an error: ${error}`,
      error: true,
    });
  }
};

export default {
  deleteProject,
  updateProject,
};
