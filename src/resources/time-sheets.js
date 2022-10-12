import express from 'express';
import fs from 'fs';

const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

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

export default router;
