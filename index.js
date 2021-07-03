const express = require('express');
const app = express();
var fs = require('fs')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const eventRoute = require('./routes/events');

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true}, () => console.log('connected to db')
);

//import routes


// create a write stream (in append mode)

morgan.token('body', function (req, res) { return req.headers['content-type'] })


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

//Middleware
app.use(express.json()); 

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/events', eventRoute);

app.listen(3000, () => console.log('Server up and running'));