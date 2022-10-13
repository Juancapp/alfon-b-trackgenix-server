import express from 'express';
import fs from 'fs';

const timeSheets = require('../data/time-sheets.json');

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

router.put('/', (req, res) => {
  const reqId = req.body.id;
  let filtered = timeSheets.filter((timeSheet) => timeSheet.id !== reqId);
  const toFilter = Object.keys(timeSheets.find((timeSheet) => timeSheet.id !== reqId));
  const reqBodyArray = Object.keys(req.body);
  const elementExists = timeSheets.some((object) => object.id === reqId);
  let validate;
  filtered.push(req.body);
  filtered = filtered.sort((a, b) => (parseInt(a.id, 10) > parseInt(b.id, 10) ? 1 : -1));
  if (reqBodyArray.length === toFilter.length) {
    for (let i = 0; i < reqBodyArray.length; i += 1) {
      for (let j = 0; j < toFilter.length; j += 1) {
        if (reqBodyArray[i] === toFilter[j]) {
          validate = true;
          break;
        } else {
          validate = false;
        }
      }
      if (!validate) {
        break;
      }
    }
  } else {
    validate = false;
  }

  if (validate && elementExists) {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filtered), (err) => {
      if (err) {
        res.status(500).json({ message: 'Cannot edit user' });
      } else {
        res.status(201).json({ message: 'User edited' });
      }
    });
  } else if (!elementExists) {
    res.status(404).json({ message: 'Id not found' });
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

router.delete('/:id', (req, res) => {
  const reqId = req.params.id;
  const filtered = timeSheets.filter((timeSheet) => timeSheet.id !== reqId);
  const elementExists = timeSheets.some((object) => object.id === reqId);
  if (elementExists) {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filtered), (err) => {
      if (err) {
        res.status(500).json({ message: 'Cannot delete timesheet' });
      } else {
        res.status(200).json({ message: 'Timesheet deleted' });
      }
    });
  } else {
    res.status(404).json({ message: 'Id not found' });
  }
});

export default router;
