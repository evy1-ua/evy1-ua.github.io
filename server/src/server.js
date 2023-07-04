const express = require('express');
const app = express();

// Configura las rutas y middleware aquí

// Inicia el servidor
const port = 3000; // Puedes usar cualquier puerto que desees
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
