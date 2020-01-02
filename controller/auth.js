const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth');
const passport = require('passport');
// const flash = require('connect-flash');
const usermodel= require('../model/employee');
// Create login page
// --------------------------------------------------
router.get('/login', (req, res, next) => {
  const messages = req.flash();

  res.render('employee/login',{messages});
});
// --------------------------------------------------


// Handle login request
// --------------------------------------------------
router.post('/login', passport.authenticate('local', 
  { failureRedirect: '/auth/login',failureFlash: 'Wrong username or password'}), (req, res, next) => {
      res.redirect('/users');
});
// --------------------------------------------------


// Create register page
// --------------------------------------------------
router.get('/register', (req, res, next) => {
  // const messages = req.flash();
  res.render('employee/register');
});
// --------------------------------------------------


// Handle register request
// --------------------------------------------------
router.post('/register', (req, res, next) => {
  const registrationParams = req.body;
  // const users = req.app.locals.users;
  const payload = {
    username: registrationParams.username,
    password: authUtils.hashPassword(registrationParams.password),
    isAdmin:true
  };
 
  usermodel.checkadmin(req.app.locals.db).then(function(data) {
    if(data.length>0){
      //my users
    }else{
      usermodel.insertUser(req.app.locals.db,payload).then(function(result) {
        res.redirect('/auth/login');
      })
    }
  });
  
  // users.insertOne(payload, (err) => {
  //   if (err) {
  //     req.flash('error', 'User account already exists.');
  //   } else {
  //     req.flash('success', 'User account registered successfully.');
  //   }

  //   res.redirect('/auth/register');
  // })
});
// --------------------------------------------------

// Logout page
// --------------------------------------------------
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;