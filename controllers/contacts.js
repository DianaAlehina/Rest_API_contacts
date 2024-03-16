const Contacts = require('../models/Contacts')
const errorHandler = require('../utils/errorHandler')
const {v4} = require("uuid");

module.exports.getContacts = async function (req, res) {
    try {
        const contacts = await Contacts.find({
            user: req.user.id
        })
        res.status(200).json(contacts)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.postContacts = async function (req, res) {
    try {
        const contact = await new Contacts({
            name: req.body.name,
            value: req.body.value,
            marked: false,
            user: req.user.id
        }).save()
        res.status(201).json(contact)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.deleteContacts = async function (req, res) {
    try {
        await Contacts.findOneAndRemove({_id: req.params.id, user: req.user.id})
        res.status(200).json({message: 'Контакт был удален.'})
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.putContacts = async function (req, res) {
    try {
        let contact = await Contacts.updateOne(
            {_id: req.params.id, user: req.user.id},
            {marked: true}
        )
        res.status(200).json(contact)
    } catch (e) {
        errorHandler(res, e)
    }
}