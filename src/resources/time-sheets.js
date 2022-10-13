import express from 'express';
import fs from 'fs';
import timeSheets from '../data/time-sheets.json';
// const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(timeSheets);
});

router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const foundUser = timeSheets.find((user) => user.id === userId);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post('/', (req, res) => {
  const newUser = req.body;
  const foundUser = timeSheets.find((user) => user.id === newUser.id);
  const empty = Object.values(newUser).some((value) => value === '');
  const complete = Object.values(newUser).length === 6;

  if (!complete) {
    res.status(400).json({ message: 'Missing fields to be completed' });
  } else if (empty) {
    res.status(400).json({ message: 'There are empty fields' });
  } else if (foundUser) {
    res.status(400).json({ message: 'This id already exist' });
  } else {
    timeSheets.push(newUser);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
      if (err) {
        res.status(400).json({ message: 'Cant save new user' });
      } else {
        res.status(200).json({ message: 'User created' });
      }
    });
  }
});

export default router;
