const express = require('express');
const supera = require('../data/super-admins.json');

const router = express.Router();

router.get('/getAllSupera', (req, res) => {
  res.send(supera);
});

router.get('getById/:id', (req, res) => {

});
module.exports = router;
