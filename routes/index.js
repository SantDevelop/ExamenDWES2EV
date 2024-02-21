const express = require('express');
const router = express.Router();
const { verUsers } = require('./conexionDB')
const { encryptPASS } = require('./pass')


router.get('/', (req, res, next) => {
  res.render('inicio');
});

router.get('/regisPage', (req, res) => {
  res.render('Pregis')
})

router.get('/loginPage', (req, res) => {
  res.render('Plogin')
})

router.get('/home', (req, res, next) => {
  res.render('home');
});

module.exports = router;
