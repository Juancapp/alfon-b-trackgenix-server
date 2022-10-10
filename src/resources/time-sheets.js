const express = require('express');
const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const reqId = req.params.id;
  const filtered = timeSheets.filter((timeSheet) => timeSheet.id !== reqId);
  const elementExists = timeSheets.some((object) => object.id === reqId);
  if (elementExists) {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filtered), (err) => {
      if (err) {
        res.send('Cannot delete timesheet');
      } else {
        res.send('Timesheet deleted');
      }
    });
  } else {
    res.send('Id not found');
  }
});

router.put('/put', (req, res) => {
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
        res.send('Cannot edit user');
      } else {
        res.send('User edited');
      }
    });
  } else if (!elementExists) {
    res.send('Id not found');
  } else {
    res.send('Invalid input');
  }
});

module.exports = router;
