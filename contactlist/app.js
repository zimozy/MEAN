//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected',function() {
  console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error',function(err) {
  if(err) {
    console.log('Error in Database connection:' + err);
  }
});

//port no
const port = 3000;

//adding middleware - cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing Server
app.get('/', function (req,res) {
  res.send('foobar');
});

app.listen(port, function() {
  console.log('Server started at port:' + port);
});
