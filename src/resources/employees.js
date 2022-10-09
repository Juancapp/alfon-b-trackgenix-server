// get y post and getById
const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/list', (req, res) => {
  if (employees) {
    res.send(employees);
  } else {
    res.send('There isn\'t any employee created');
  }
});
router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find((employ) => `${employ.id}` === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send(`Can´t find user ID: ${employeeId}`);
  }
});
router.post('/create', (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send(`Can't create user ID:${newEmployee.id}`);
    } else {
      res.send(`User created ID:${newEmployee.id}`);
    }
  });
});

module.exports = router;
