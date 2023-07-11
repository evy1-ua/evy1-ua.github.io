const express = require('express');
const router = express.Router();
const passport = require('passport')
const  passport1  = require('../config/passport');
const  isAuthenticated  = require('../middlewares/auth');




router.get('/', (req, res) => {
  res.render("index");
});

router.get('/login', (req, res) => {
  res.render("login");
});
router.post('/login', passport.authenticate('local', {
  
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});


module.exports = router;
