const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(timeSheets);
});

router.get('/getByid/:id', (req, res) => {
  const userId = req.params.id;
  const foundUser = timeSheets.find((user) => user.id === userId);
  if (foundUser) {
    res.send(foundUser);
  } else {
    res.send('User not found');
  }
});

router.post('/add', (req, res) => {
  const newUser = req.body;
  timeSheets.push(newUser);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send('Cant save new user');
    } else {
      res.send('User created');
    }
  });
});

router.get('/prueba', (req, res) => {
  console.log(req.query);
  const { typeFilter, filterValue } = req.query;
  if (typeFilter === 'proyect') {
    const usersByProyect = timeSheets.filter((users) => users.proyect === filterValue);
    if (usersByProyect) {
      res.send(usersByProyect);
    } else {
      res.send("there's no users asign on this proyect");
    }
  } else if (typeFilter === 'taskName') {
    const userByTaskName = timeSheets.filter((users) => users.taskName === filterValue);
    if (userByTaskName) {
      res.send(userByTaskName);
    } else {
      res.send("there's no users asign on this task");
    }
  }
});

module.exports = router;
