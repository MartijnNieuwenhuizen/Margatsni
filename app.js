var express = require('express');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var myConnection = require('express-myconnection');

//  =================
//  = Setup the app =
//  =================

// The app itself
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  ============================
//  = Middleware configuration =
//  ============================

// Setup serving static assets
app.use(express.static(path.join(__dirname, 'public')));

// Add session support
app.use(session({
  secret: '...', // CHANGE THIS!!!
  store: new FileStore(),
  saveUninitialized: true,
  resave: false
}));

// Setup bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Setup Multer
app.use(multer({
  dest: __dirname + '/public/images'
}));

// Setup MySQL

// Database configuration
var dbOptions = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'photosharing'
};

// Add connection middleware
app.use(myConnection(mysql, dbOptions, 'single'));

//  ===========
//  = Routers =
//  ===========

//Home router
var index = require('./routers/index');
app.use('/index', index);

//Inloggen 
var userLogin = require('./routers/user');
app.use('/user', userLogin);

//Registreren
var userRegisteren = require('./routers/registreren');
app.use('/registreren', userRegisteren);

//Image upload
var upload = require('./routers/upload');
app.use('/uploaden', upload);

// This should be the ONLY route in this file!
app.get('/', function(req, res){
  res.redirect('/index');
});

//  =================
//  = Start the app =
//  =================

app.listen(3000, function(){
  console.log('App listening at http://localhost:3000');
});