const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require ('mongoose')
const weatherRoutes = require('./clima-app/src/Ruta/rutas');

app.use(cors());
mongoose.connect('mongodb://localhost:27017/Clima')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`El servidor está en el puerto ${PORT}`);
});