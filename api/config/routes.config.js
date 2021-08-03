const express = require('express');
const contacts = require('../controllers/contacts.controller');
const router = express.Router();

router.get('/contacts', contacts.list);

module.exports = router;
