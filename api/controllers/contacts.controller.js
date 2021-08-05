const createError = require('http-errors');
const Contact = require('../models/contact.model');

module.exports.list = (req, res, next) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(error => next(error));
}

module.exports.detail = (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (!contact) {
        next(createError(404, 'Contact not found'))
      } else {
        res.json(contact);
      }
    })
    .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(contact => {
      if (!contact) {
        next(createError(404, 'Contact not found'))
      } else {
        res.status(204).send();
      }
    })
    .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
  Contact.create(req.body)
    .then(contact => res.status(201).json(contact))
    .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {
  const data = { name, email, phone, avatar } = req.body;
  Contact.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    .then(contact => {
      if (!contact) {
        next(createError(404, 'Contact not found'))
      } else {
        res.json(contact);
      }
    })
    .catch(error => next(error))
}
