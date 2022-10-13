import express from 'express';

import fs from 'fs';

const admins = require('../data/admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(admins);
});

router.get('/:id', (req, res) => {
  const adminID = parseInt(req.params.id, 10);
  const result = admins.find((admin) => admin.id === adminID);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ message: 'Admin whit this ID doesnt exist' });
  }
});

router.post('/', (req, res) => {
  const newAdmin = {
    id: Number(req.body.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.status(400).json({ message: 'Cannot create admin' });
    } else {
      res.status(200).json({ message: 'Admin created' });
    }
  });
});

export default router;
