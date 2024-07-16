const express = require('express');
const path = require('path');
const memberController = require('./controllers/memberController');
const reservationController = require('./controllers/reservationController');

const router = express.Router();

// Redirect root to memberRegistration
router.get('/', (req, res) => {
  res.redirect('/memberRegistration');
});

// Serve static HTML files
router.get('/memberRegistration', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'memberRegistration.html'));
});

router.get('/gymSelection', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'gymSelection.html'));
});

router.get('/machineSelection', reservationController.getMachines);

router.get('/reservationConfirmation', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reservationConfirmation.html'));
});

// Handle form submissions
router.post('/register', memberController.registerMember);
router.post('/selectGym', reservationController.selectGym);
router.post('/selectMachines', reservationController.selectMachines);
router.post('/confirmReservation', reservationController.confirmReservation);

module.exports = router;
