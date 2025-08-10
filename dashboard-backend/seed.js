const mongoose = require('mongoose');
const User = require('./models/user');
const Product = require('./models/product');

const mongoURI = "mongodb+srv://gedeondiamokina:Nicolas%402002@cluster0.0fqtar9.mongodb.net/Dashboard?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connexion à MongoDB réussie pour seed");
  seedData();
}).catch(err => {
  console.error("❌ Erreur de connexion à MongoDB :", err);
});

async function seedData() {
  try {
    // Supprimer les données existantes
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️ Données existantes supprimées");

    // Créer des utilisateurs
    const users = [
      {
        nom: "Alice Dupont",
        email: "alice@example.com",
        password: "password123"
      },
      {
        nom: "Bob Martin",
        email: "bob@example.com",
        password: "password123"
      },
      {
        nom: "Charlie Bernard",
        email: "charlie@example.com",
        password: "password123"
      },
      {
        nom: "Diana Leroy",
        email: "diana@example.com",
        password: "password123"
      },
      {
        nom: "Eric Dubois",
        email: "eric@example.com",
        password: "password123"
      }
    ];

    // Créer des produits avec catégories
    const products = [
      {
        name: "iPhone 15 Pro",
        price: 850000,
        description: "Smartphone Apple dernière génération avec puce A17 Pro",
        category: "Smartphones",
        isActive: true,
        promoted: true
      },
      {
        name: "Samsung Galaxy S24",
        price: 750000,
        description: "Smartphone Samsung avec intelligence artificielle",
        category: "Smartphones",
        isActive: true,
        promoted: false
      },
      {
        name: "MacBook Air M3",
        price: 1200000,
        description: "Ordinateur portable Apple avec puce M3",
        category: "Ordinateurs",
        isActive: true,
        promoted: true
      },
      {
        name: "Dell XPS 13",
        price: 900000,
        description: "Ordinateur portable Dell haute performance",
        category: "Ordinateurs",
        isActive: false,
        promoted: false
      },
      {
        name: "AirPods Pro",
        price: 45000,
        description: "Écouteurs sans fil Apple avec réduction de bruit",
        category: "Audio",
        isActive: true,
        promoted: false
      },
      {
        name: "iPad Pro 12.9",
        price: 1100000,
        description: "Tablette Apple avec écran Liquid Retina XDR",
        category: "Tablettes",
        isActive: true,
        promoted: true
      },
      {
        name: "Sony WH-1000XM5",
        price: 380000,
        description: "Casque sans fil avec réduction de bruit active",
        category: "Audio",
        isActive: true,
        promoted: false
      },
      {
        name: "Apple Watch Series 9",
        price: 450000,
        description: "Montre connectée Apple avec GPS et cellular",
        category: "Montres connectées",
        isActive: true,
        promoted: true
      }
    ];

    const insertedUsers = await User.insertMany(users);
    const insertedProducts = await Product.insertMany(products);

    console.log(`✅ ${insertedUsers.length} utilisateurs créés`);
    console.log(`✅ ${insertedProducts.length} produits créés`);
    console.log("🎉 Seed terminé avec succès !");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
    process.exit(1);
  }
}
