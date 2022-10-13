import express from 'express';
import fs from 'fs';

const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(superAdmins);
});

router.get('/:id', (req, res) => {
  const superId = parseInt(req.params.id, 10);
  const foundSupera = superAdmins.find((sup) => sup.id === superId);
  if (foundSupera) {
    res.status(200).send(foundSupera);
  } else {
    res.status(400).json({ message: 'Super Admin not found' });
  }
});

router.post('/', (req, res) => {
  const newSuperAdmins = req.body;
  if (newSuperAdmins.id === '' || newSuperAdmins.name === '' || newSuperAdmins.lastName === '' || newSuperAdmins.email === '' || newSuperAdmins.password === '') {
    res.status(400).json({ message: 'All fiels are required' });
  }
  const repeatId = superAdmins.find((sup) => sup.id === newSuperAdmins.id);
  if (repeatId === undefined) {
    superAdmins.push(newSuperAdmins);
  } else {
    res.status(400).json({ message: 'The id cannot be repeted.' });
  }
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (err) => {
    if (err) {
      res.status(400).json({ message: 'Cannot save the new Super Admin.' });
    } else {
      res.status(200).json({ message: 'Super Admin created.' });
    }
  });
});

export default router;
