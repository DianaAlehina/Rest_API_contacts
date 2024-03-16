const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    value: {
        type: String,
        require: true,
        unique: true
    },
    marked: {
        type: Boolean,
        require: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('contacts', contactsSchema)
