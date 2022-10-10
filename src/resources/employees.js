// get y post and getById
const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/list', (req, res) => {
  if (employees) {
    res.status(200).send(employees);
  } else {
    res.status(404).send('There isn\'t any employee created');
  }
});
router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((employ) => `${employ.id}` === employeeId);
  if (employee) {
    res.status(200).send(employee);
  } else {
    res.status(404).send(`Can´t find user ID: ${employeeId}`);
  }
});
router.post('/create', (req, res) => {
  const newEmployee = req.body;
  const emptyValues = Object.values(newEmployee).some((value) => value === '');
  const bodyComplete = Object.values(newEmployee).length === 8;

  if (!bodyComplete) {
    res.status(400).send('There are some properties missing');
  } else if (emptyValues) {
    res.status(400).send('There are some empty properties');
  } else {
    employees.forEach((emp) => {
      if (`${emp.id}` === newEmployee.id) {
        res.status(406).send('Already exist employee with this id');
      }
    });
  }
  if (res.status !== 400 && res.status !== 406) {
    employees.push(newEmployee);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(400).send(`Can't create user ID:${newEmployee.id}`);
      } else {
        res.status(201).send(`User created ID:${newEmployee.id}`);
      }
    });
  }
});

module.exports = router;
