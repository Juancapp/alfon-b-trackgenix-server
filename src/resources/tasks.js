import express from 'express';
import fs from 'fs';

const tasks = require('../data/tasks.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: tasks,
  });
});

router.get('/:id', (req, res) => {
  const findTask = tasks.find((task) => task.id === parseInt(req.params.id, 10));
  if (findTask) {
    res.status(200).json({
      data: findTask,
    });
  } else {
    res.status(404).json({
      message: 'task not found',
    });
  }
});

router.delete('/:id', (req, res) => {
  const filterTask = tasks.filter((task) => task.id !== parseInt(req.params.id, 10));
  fs.writeFile('src/data/tasks.json', JSON.stringify(filterTask), (err) => {
    if (err) {
      res.status(404).json({
        message: 'Cannot delete task',
      });
    } else {
      res.status(200).json({
        message: 'task deleted',
      });
    }
  });
});

router.post('/', (req, res) => {
  let newId = parseInt(tasks.length + 1, 10);
  const newTask = req.body;
  let findTask = tasks.find((task) => task.id === newId);
  const findTaskName = tasks.find((task) => task.taskName === newTask.taskName);
  while (findTask) {
    newId += 1;
    const newIdStr = newId;
    findTask = tasks.find((task) => task.id === newIdStr);
  }
  if (findTaskName) {
    res.status(404).json({
      message: 'There is already a task with that name. Try a new one.',
    });
  } else {
    newTask.id = newId;
    fs.writeFile('src/data/tasks.json', JSON.stringify([...tasks, newTask]), (err) => {
      if (err) {
        res.status(404).json({
          message: 'Cannot save new task',
        });
      } else {
        res.status(200).json({
          message: 'task created',
        });
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskReq = req.body;
  const findTaskId = tasks.find((task) => task.id === taskId);
  const findTaskName = tasks.find((task) => task.taskName === taskReq.taskName);
  const newArrTask = tasks.filter((task) => task.id !== parseInt(req.params.id, 10));
  if (taskReq.taskName === undefined || taskReq.taskName === '') {
    return res.status(404).json({
      message: 'The task must have a name',
    });
  }
  if (taskReq.taskDescription === undefined || taskReq.taskDescription === '') {
    return res.status(404).json({
      message: 'The task must have a description',
    });
  }
  if (findTaskId === undefined) {
    return res.status(404).json({
      message: 'task not found',
    });
  }
  if (!findTaskName && findTaskId) {
    taskReq.id = taskId;
    fs.writeFile('src/data/tasks.json', JSON.stringify([...newArrTask, taskReq]), (err) => {
      if (err) {
        res.status(400).json({
          message: 'An error occurred',
        });
      } else {
        res.status(200).json({
          message: 'Task updated',
        });
      }
    });
  }
  return res.status(404).json({
    message: 'A task with that name already exists',
  });
});

export default router;
