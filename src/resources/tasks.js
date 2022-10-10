const express = require('express');

const fs = require('fs');

const tasks = require('../data/tasks.json');

const router = express.Router();

router.get('/list', (req, res) => {
  res.status(200).json({
    data: tasks,
  });
});

router.get('/list/:id', (req, res) => {
  const taskId = req.params.id;
  const findTask = tasks.find((task) => task.id === taskId);
  if (findTask) {
    res.send(findTask);
  } else {
    res.send('task not found');
  }
});

router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const filterTask = tasks.filter((task) => task.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filterTask), (err) => {
    if (err) {
      res.send('Cannot delete task');
    } else {
      res.send('task deleted');
    }
  });
});

router.post('/create', (req, res) => {
  let newId = tasks.length + 1;
  const newTask = req.body;
  let findTask = tasks.find((task) => task.id === newId.toString());
  const findTaskName = tasks.find((task) => task.taskName === newTask.taskName);
  while (findTask !== undefined) {
    newId += 1;
    const newIdStr = newId.toString();
    findTask = tasks.find((task) => task.id === newIdStr);
  }
  if (findTaskName) {
    res.send('There is already a task with that name. Try a new one.');
  } else {
    newTask.id = newId.toString();
    tasks.push(newTask);
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send('Cannot save new task');
      } else {
        res.send('task created');
      }
    });
  }
});

router.put('/update/:id', (req, res) => {
  //   const taskId = req.params.id;
  res.send('funciona');
});

module.exports = router;
