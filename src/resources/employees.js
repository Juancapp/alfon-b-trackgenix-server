// get y post and getById
const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(employees);
});
router.post('/post', (req, res) => {
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
