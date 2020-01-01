const express=require('express');
var createError = require('http-errors');
// require('./model/db');
// require('./model/employee.model');
const path=require('path');
var cookieParser = require('cookie-parser');
var expresshbs=require('express-handlebars');
var hbs=require('hbs');



const authUtils = require('./utils/auth');

//passport starts
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
var session = require("express-session");
const flash = require('connect-flash');

var homeconroller=require('./controller/home.js');
var employeeconroller=require('./controller/employee.js');
var authcontroller=require('./controller/auth.js')
var userscontroller=require('./controller/users.js')



// var mongo = require("express-mongo-db");
// const MongoClient = require('mongodb').MongoClient;
const app=express();

var mongojs = require('mongojs');
app.locals.db = mongojs('localhost/mytestdb');
const users = app.locals.db.collection('users');
// --------------------------------------------------
passport.use(new Strategy((username, password, done)=> {
      users.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }
        
        if (!user) {
          return done(null, false);
        }
        
        if (user.password != authUtils.hashPassword(password)) {
          return done(null, false);
        }
        
        return done(null, user);
      });
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });


  app.set('views',path.join(__dirname,'/views'));
  app.engine('hbs',expresshbs({extname:'hbs',defaultLayout:'mainlayout',layoutsDir:__dirname+"/views/layouts/"}));
  app.set('view engine','hbs');
  hbs.registerPartials(path.join(__dirname, 'views/partials'));


const bodyparser=require('body-parser');
app.use(bodyparser.json())


// app.use(mongo('mongodb://localhost/mytestdb'));

// app.locals.users = users;





    // bodyParser = require("body-parser");
app.use(cookieParser());
app.use(express.static("public"));
// app.use(require('cookie-parser')());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(session({resave:true,saveUnInitialized:true,secret: "session secret" }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
  });


app.use('/',homeconroller);
app.use('/auth',authcontroller);
app.use('/emp',employeeconroller);
app.use('/users',userscontroller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
});
