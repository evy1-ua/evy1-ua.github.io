const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('../config/passport');
const path = require('path');
const bodyParser = require('body-parser');

// Cargar variables de entorno
require('dotenv').config();

// Configuración de la sesión
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Inicializar Passport y establecer la sesión
app.use(passport.initialize());
app.use(passport.session());

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Configuración para servir archivos estáticos
app.use(express.static('cliente', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  },
}));

// Configura el motor de plantillas HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../../client/pages'));

// Definimos las rutas
app.use('/', require('../routes/pages'));

// Configuración del puerto
const port = process.env.PORT || 3000;

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
