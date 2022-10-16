// import express from 'express';
// import fs from 'fs';

// const tasks = require('../data/tasks.json');

// const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).json({
//     data: tasks,
//   });
// });

// router.get('/:id', (req, res) => {
//   const findTask = tasks.find((task) => task.id === parseInt(req.params.id, 10));
//   if (findTask) {
//     res.status(200).json({
//       data: findTask,
//     });
//   } else {
//     res.status(404).json({
//       message: 'task not found',
//     });
//   }
// });

// router.post('/', (req, res) => {
//   let newId = parseInt(tasks.length + 1, 10);
//   const newTask = req.body;
//   let findTask = tasks.find((task) => task.id === newId);
//   const findTaskName = tasks.find((task) => task.taskName === newTask.taskName);
//   while (findTask) {
//     newId += 1;
//     const newIdStr = newId;
//     findTask = tasks.find((task) => task.id === newIdStr);
//   }
//   if (findTaskName) {
//     res.status(404).json({
//       message: 'There is already a task with that name. Try a new one.',
//     });
//   } else {
//     newTask.id = newId;
//     fs.writeFile('src/data/tasks.json', JSON.stringify([...tasks, newTask]), (err) => {
//       if (err) {
//         res.status(404).json({
//           message: 'Cannot save new task',
//         });
//       } else {
//         res.status(200).json({
//           message: 'task created',
//         });
//       }
//     });
//   }
// });

// router.put('/:id', (req, res) => {
//   const taskId = parseInt(req.params.id, 10);
//   const taskReq = req.body;
//   const findTaskId = tasks.find((task) => task.id === taskId);
//   const findTaskName = tasks.find((task) => task.taskName === taskReq.taskName);
//   const newArrTask = tasks.filter((task) => task.id !== parseInt(req.params.id, 10));
//   if (taskReq.taskName === undefined || taskReq.taskName === '') {
//     return res.status(404).json({
//       message: 'The task must have a name',
//     });
//   }
//   if (taskReq.taskDescription === undefined || taskReq.taskDescription === '') {
//     return res.status(404).json({
//       message: 'The task must have a description',
//     });
//   }
//   if (findTaskId === undefined) {
//     return res.status(404).json({
//       message: 'task not found',
//     });
//   }
//   if (!findTaskName && findTaskId) {
//     taskReq.id = taskId;
//     fs.writeFile('src/data/tasks.json', JSON.stringify([...newArrTask, taskReq]), (err) => {
//       if (err) {
//         res.status(400).json({
//           message: 'An error occurred',
//         });
//       } else {
//         res.status(200).json({
//           message: 'Task updated',
//         });
//       }
//     });
//   }
//   return res.status(404).json({
//     message: 'A task with that name already exists',
//   });
// });

// router.delete('/:id', (req, res) => {
//   const filterTask = tasks.filter((task) => task.id !== parseInt(req.params.id, 10));
//   fs.writeFile('src/data/tasks.json', JSON.stringify(filterTask), (err) => {
//     if (err) {
//       res.status(404).json({
//         message: 'Cannot delete task',
//       });
//     } else {
//       res.status(200).json({
//         message: 'task deleted',
//       });
//     }
//   });
// });

// export default router;
import Tasks from '../models/Tasks';

const createTask = async (req, res) => {
  try {
    const task = new Tasks({
      description: req.body.description,
    });
    return res.status(201).json({
      message: 'Task created successfully',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Cannot add new task',
      error: true,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      error,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    const id = { id: Number(req.body.id) };
    const task = await Tasks.findById(id);
    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  const reqBody = req.body;
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(reqBody);

    return res.status(200).json({
      message: 'The task has been updated',
      data: updatedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There was an error',
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  const reqId = req.params.id;
  try {
    const deletedTask = await Tasks.findByIdAndDelete(reqId);

    return res.status(200).json({
      message: 'The task has been deleted',
      data: deletedTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'There has been an error',
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
};
