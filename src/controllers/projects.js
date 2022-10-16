import Projects from '../models/Projects';

const updateProject = async (req, res) => {
  const reqBody = req.body;
  try {
    const result = await Projects.findByIdAndUpdate(reqBody);

    return res.status(200).json({
      message: 'the project has been deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'There has been an error',
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  const reqId = req.params.id;
  try {
    const result = await Projects.findByIdAndDelete(reqId);

    return res.status(200).json({
      message: 'Se borro el project',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'There has been an error',
      error: true,
    });
  }
};

export default {
  deleteProject,
  updateProject,
};
