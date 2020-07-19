const { Router } = require('express');
const router = Router();

// eslint-disable-next-line import/no-unresolved
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res) => {
  try {
  const entries = await LogEntry.find();
  res.json(entries);
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
    if(error.name === 'ValidationError') {
      res.status(422);
    }
  }
});

module.exports = router;
