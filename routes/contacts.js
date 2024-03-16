const express = require('express')
const passport = require('passport')
const path = require('path')
const {v4} = require('uuid')
const controller = require('../controllers/contacts')

const contact = express()
const router = express.Router()

let CONTACTS = [
    {id: v4(), name: 'Диана', value: '+7-989-627-95-60', marked: false}
]

contact.use(express.json())

// GET
contact.get('/', passport.authenticate('jwt', {session: false}), controller.getContacts)

//POST
contact.post('/', passport.authenticate('jwt', {session: false}), controller.postContacts)

// DELETE
contact.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteContacts)

// PUT
contact.put('/:id', passport.authenticate('jwt', {session: false}), controller.putContacts)

module.exports = contact