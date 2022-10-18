import mongoose from 'mongoose';
import Projects from '../models/Projects';

const projects = async (req, res) => {
  try {
    const project = await Projects.find();
    return res.status(200).json({
      message: 'Projects found successfully',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Projects not found ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const getProjectsById = async (req, res) => {
  const projectId = req.params.id;
  if (projectId && !mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({
      message: `Cannot get project by ${projectId}`,
      data: undefined,
      error: true,
    });
  }
  try {
    const project = await Projects.findById(projectId);
    if (project) {
      return res.status(200).json({
        message: `Project whit id ${projectId} found successfully`,
        data: project,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Project whit Id ${projectId} not found`,
      data: undefined,
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

const newProject = async (req, res) => {
  try {
    const project = new Projects({
      employees: req.body.employees,
      name: req.body.name,
      startDate: req.body.startDate,
      description: req.body.description,
      clientName: req.body.clientName,
      active: req.body.active,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'Project created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      error: true,
      data: undefined,
    });
  }
};

export default {
  projects,
  getProjectsById,
  newProject,
};
