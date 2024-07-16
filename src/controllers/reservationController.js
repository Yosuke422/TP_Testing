const path = require('path');
const Reservation = require('../models/reservation');

const gyms = {
  "Gym A": ["Treadmill", "Bike"],
  "Gym B": ["Rowing Machine", "Elliptical"],
  "Gym C": ["Treadmill", "Rowing Machine", "Elliptical"],
  "Gym D": ["Bike", "Elliptical"]
};

const validateReservation = (reservation) => {
    const { gym, machines } = reservation;
    if (!gym || !machines || machines.length === 0) {
      return false;
    }
    return true;
  };

const selectGym = (req, res) => {
  const { gym } = req.body;
  if (!gym) {
    return res.status(400).send({ error: 'Gym selection is required' });
  }
  req.session.selectedGym = gym;
  return res.redirect('/machineSelection');
};

const getMachines = (req, res) => {
  const selectedGym = req.session.selectedGym;
  if (!selectedGym) {
    return res.redirect('/gymSelection');
  }
  const machines = gyms[selectedGym];
  res.render('machineSelection', { selectedGym, machines });
};

const selectMachines = (req, res) => {
  const { machines } = req.body;
  if (!machines || machines.length === 0) {
    return res.status(400).send({ error: 'At least one machine must be selected' });
  }
  // Store the selected machines in session
  req.session.selectedMachines = machines;
  return res.redirect('/reservationConfirmation');
};

const confirmReservation = (req, res) => {
  const reservation = {
    gym: req.session.selectedGym,
    machines: req.session.selectedMachines
  };
  if (!validateReservation(reservation)) {
    return res.status(400).send({ error: 'Reservation details are required' });
  }
  Reservation.create(reservation);
  return res.sendFile(path.join(__dirname, '..', 'views', 'reservationConfirmation.html'));
};

module.exports = { selectGym, getMachines, selectMachines, confirmReservation, validateReservation };
