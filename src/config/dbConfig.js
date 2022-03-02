require('dotenv').config()

const mongoose = require('mongoose');


let dbCredentials = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbCredentials, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected!');
    })
    .catch((err) => console.log(err.message))


let db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connected to database!');
})

db.on('disconnected', () => {
    console.log('Mongoose lost connection!');
})

db.on('err', (err) => {
    console.log(err.message);
})

