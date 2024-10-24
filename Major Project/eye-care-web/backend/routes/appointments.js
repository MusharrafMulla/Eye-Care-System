// backend/routes/appointments.js

const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Create Appointment
router.post('/', async (req, res) => {
  const { userId, date, time } = req.body;

  try {
    const appointment = new Appointment({ userId, date, time });
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Get Appointments
router.get('/:userId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
});

module.exports = router;
