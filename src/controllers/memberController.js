const path = require('path');
const Member = require('../models/member');

const validateMember = (member) => {
  const { name, surname, email, password } = member;
  if (!name || !surname || !email || !password) {
    return false;
  }
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const registerMember = (req, res) => {
  const { name, surname, email, password } = req.body;
  if (!validateMember({ name, surname, email, password })) {
    return res.status(400).send({ error: 'All fields are required and email must be valid' });
  }
  // Mock saving to the database
  Member.create({ name, surname, email, password });
  req.session.member = { name, surname, email };
  return res.redirect('/gymSelection');
};

module.exports = { registerMember, validateMember };
