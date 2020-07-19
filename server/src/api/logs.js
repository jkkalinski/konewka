const { Router, json } = require('express');
const router = Router();
const axios = require('axios');

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


const BASE_URL = 'https://trefle.io/api/v1/plants?token=';

router.get('/', async (req, res) => {
  try { 
    const params = new URLSearchParams({
    api_key: process.env.TREFLE_API_KEY,
    feedtype: 'json',
    ver: '1.0'
  });
const { data } = await axios.get(`${BASE_URL}${params}`)
res.json(data);

} catch (error) {
   next(error);
}
});

module.exports = router;
