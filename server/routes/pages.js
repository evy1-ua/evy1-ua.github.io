const express = require('express');
const router = express.Router();
const  isAuthenticated  = require('../middlewares/auth');
const  passport  = require('../config/passport');


router.get('/', (req, res) => {
  res.render("index");
});

router.get('/login', (req, res) => {
  res.render("login");
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});


module.exports = router;
