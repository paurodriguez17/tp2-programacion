const express = require('express');
const cors = require('cors');
const app = express();
const weatherRoutes = require('./Ruta/rutas');

app.use(cors());
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`El servidor está en el puerto ${PORT}`);
});