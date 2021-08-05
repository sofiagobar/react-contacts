const express = require('express');
const contacts = require('../controllers/contacts.controller');
const router = express.Router();

router.get('/contacts', contacts.list);
router.post('/contacts', contacts.create);
router.get('/contacts/:id', contacts.detail);
router.delete('/contacts/:id', contacts.delete);
router.put('/contacts/:id', contacts.edit);

module.exports = router;
