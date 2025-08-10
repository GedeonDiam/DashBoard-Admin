const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const statsRoute = require('./routes/stats');

const app = express();

// Connexion à MongoDB
mongoose.connect("mongodb+srv://gedeondiamokina:Nicolas%402002@cluster0.0fqtar9.mongodb.net/Dashboard?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connecté à MongoDB");
}).catch(err => {
  console.error("❌ Erreur de connexion à MongoDB :", err);
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // URL de votre app React
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/stats', statsRoute);

console.log("📝 Route /api/stats montée !");

// Route de test
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API du dashboard 🎯");
});


// Lancement du serveur
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📋 Routes disponibles:`);
  console.log(`   GET  /api/stats/dashboard`);
  console.log(`   GET  /api/stats/users`);
  console.log(`   GET  /api/stats/products`);
  console.log(`   GET  /api/stats/products-monthly`);
  console.log(`   GET  /api/stats/products-categories`);
});
