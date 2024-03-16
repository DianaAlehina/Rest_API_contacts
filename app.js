const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const {v4} = require('uuid')
const authRoutes = require('./routes/auth')
const contactsRoutes = require('./routes/contacts')
const app = express()

// Подключение к БД
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log(`MongoDB connected!`);
});

app.use(morgan('dev'))
app.use(cors('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactsRoutes)

let CONTACTS = [
    {id: v4(), name: 'Диана', value: '+7-989-627-95-60', marked: false}
]

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'Контакт был удален'})
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

// Обозначение папку как статической
app.use(express.static(path.resolve(__dirname, 'client')))

// вернуть определенный путь
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

// Запуск сервера
app.listen(3000, () => console.log('Server has been started on port 3000...'))

module.exports = app