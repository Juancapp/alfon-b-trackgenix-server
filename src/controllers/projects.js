import mongoose from 'mongoose';
import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find().populate('employees.employee');
    if (!projects.length) {
      return res.status(404).json({
        message: 'Projects not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Projects found successfully',
      data: projects.filter((project) => project.active === true),
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
    const project = await Projects.findById(projectId).populate('employees.employee');
    if (project) {
      return res.status(200).json({
        message: `Project with id ${projectId} found successfully`,
        data: project,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Project with Id ${projectId} not found`,
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

const createProject = async (req, res) => {
  try {
    const newProject = new Projects({
      employees: req.body.employees,
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      clientName: req.body.clientName,
      active: true,
    });
    const result = await newProject.save();
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

const updateProject = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Project with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const updatedProject = await Projects.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    ).populate('employees.employee');
    if (updatedProject) {
      return res.status(200).json({
        message: `Project with id ${req.params.id} updated successfully`,
        data: updatedProject,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Project with id ${req.params.id} not found`,
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

const deleteProject = async (req, res) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: `Project with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { id } = req.params;
    const deletedProject = await Projects.findByIdAndDelete(id);
    if (deletedProject) {
      return res.status(204).json({
        message: 'Project deleted successfully',
        data: deletedProject,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Project with id ${req.params.id} not found`,
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

export default {
  getAllProjects,
  getProjectsById,
  createProject,
  updateProject,
  deleteProject,
};
