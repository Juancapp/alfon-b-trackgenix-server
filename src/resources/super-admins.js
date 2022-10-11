const express = require('express');
const fs = require('fs');
const supera = require('../data/super-admins.json');

const router = express.Router();

router.get('/getAllSupera', (req, res) => {
  res.send(supera);
});

router.get('getById/:id', (req, res) => {
  const superId = parseInt(req.params.id, 10);
  const foundSupera = supera.find((sup) => sup.id === superId);
  if (foundSupera) {
    res.status(200).send(foundSupera);
  } else {
    res.status(400).json({ msg: 'Super Admin not found' });
  }
});

router.post('/add', (req, res) => {
  const newSupera = req.body;
  if (newSupera.id === '' || newSupera.name === '' || newSupera.lastName === '' || newSupera.email === '' || newSupera.password === '') {
    res.status(400).json({ msj: 'All fiels are required' });
  }
  const repeatId = supera.find((sup) => sup.id === newSupera.id);
  if (repeatId === undefined) {
    supera.push(newSupera);
  } else {
    res.status(400).json({ msj: 'The id cannot be repeted.' });
  }
  fs.writeFile('src/data/super-admins.json', JSON.stringify(supera, null, 2), (err) => {
    if (err) {
      res.status(400).json({ msj: 'Cannot save the new Super Admin.' });
    } else {
      res.status(200).json({ msj: 'Super Admin created.' });
    }
  });
});

module.exports = router;
