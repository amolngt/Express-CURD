const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth');
const passport = require('passport');
const usermodel= require('../model/users');
const flash = require('connect-flash');

router.get('/login', (req, res, next) => {
  const messages = req.flash();

  res.render('employee/login',{messages});
});
router.post('/login', passport.authenticate('local', 
  { failureRedirect: '/auth/login',failureFlash: 'Wrong username or password'}), (req, res, next) => {
      res.redirect('/users');
});
router.get('/register', (req, res, next) => {
  const messages = req.flash();
  res.render('employee/register',{ messages });
});
router.post('/register', (req, res, next) => {
  if(req.body.username=="" ||  req.body.password==""){
    req.flash('error', 'Please provide details.');
    res.redirect('/auth/register');
  }
  const registrationParams = req.body;
  const payload = {
    username: registrationParams.username,
    password: authUtils.hashPassword(registrationParams.password),
    isAdmin:true
  };
 
  usermodel.checkAlreadyexists(req.app.locals.db,req.body.username).then(function(result) {
    if(result.length>0){      
      req.flash('error', 'User account already exists.');
      res.redirect('/auth/register');
    }else{
      usermodel.insertUser(req.app.locals.db,payload).then(function(result) {
        res.redirect('/auth/login');
      })
    }
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;