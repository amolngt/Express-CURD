const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth');
const passport = require('passport');
const usermodel= require('../model/users');
const flash = require('connect-flash');
router.use(flash())
router.get('/login', (req, res, next) => {
  const messages = req.flash();

  res.render('employee/login',{messages});
});
router.post('/login', passport.authenticate('local', 
  { failureRedirect: '/auth/login',failureFlash: 'Wrong username or password'}), (req, res, next) => {
      res.redirect('/users');
});
router.get('/register', (req, res, next) => {
  // const messages = req.flash();
  res.render('employee/register');
});
router.post('/register', (req, res, next) => {
  const registrationParams = req.body;
  // const users = req.app.locals.users;
  const payload = {
    username: registrationParams.username,
    password: authUtils.hashPassword(registrationParams.password),
    isAdmin:true
  };
 
  usermodel.checkAlreadyexists(req.app.locals.db,req.body.username).then(function(result) {
    if(result.length>0){      
      req.flash('messages', 'User account already exists.');
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