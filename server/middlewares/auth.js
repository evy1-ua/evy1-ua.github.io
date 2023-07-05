function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // Si el usuario está autenticado, continuamos con la siguiente función middleware
      return next();
    }
    // Si el usuario no está autenticado, redirigimos a la página de inicio de sesión
    res.redirect('/login');
  }
  
  module.exports = isAuthenticated;
  
