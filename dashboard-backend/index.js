// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const statsRoute = require('./routes/stats'); // Import de ta route stats

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Connexion à MongoDB
// mongoose.connect("mongodb+srv://gedeondiamokina:Nicolas%402002@cluster0.0fqtar9.mongodb.net/Dashboard?retryWrites=true&w=majority&appName=Cluster0", {
// })
// .then(() => console.log("✅ Connexion à MongoDB réussie"))
// .catch((err) => console.error("❌ Erreur MongoDB :", err));

// // Route stats
// app.use('/api/stats', statsRoute);

// // Route test simple
// app.get('/', (req, res) => {
//   res.send('Bienvenue sur l’API du dashboard 🎯');
// });

// // Démarrage serveur
// const PORT = 5500;
// app.listen(PORT, () => {
//   console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
// });
