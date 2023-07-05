const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Configuración de la estrategia de autenticación local
passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Buscamos el usuario en la base de datos por correo electrónico
        const user = await User.findOne({ email });
        // Si no se encuentra el usuario o la contraseña no coincide, devolveremos un error
        if (!user || !user.comparePassword(password)) {
          return done(null, false, { message: 'Credenciales inválidas' });
        }
        // Si la autenticación es exitosa, devolvemos el usuario
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  // Almacenar el ID del usuario en la sesión
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Recuperar el usuario a través de su ID almacenado en la sesión
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  module.exports = passport;
  