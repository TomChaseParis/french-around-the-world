// server.js minimaliste
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Pour servir éventuellement ton build React
app.use(express.static(path.join(__dirname, 'build')));

// Route test simple
app.get('/ping', (req, res) => {
  res.send('Serveur opérationnel !');
});

// Démarrage serveur
const PORT = 3001;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
