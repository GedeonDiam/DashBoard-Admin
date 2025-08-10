const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');

// 📊 Route principale du dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    const newUsers = await User.countDocuments({ createdAt: { $gte: last30Days } });
    const newProducts = await Product.countDocuments({ createdAt: { $gte: last30Days } });
    const promotedProducts = await Product.countDocuments({ promoted: true });
    const totalUsers = await User.countDocuments();

    res.json({
      totalUsers,
      newUsers,
      newProducts,
      promotedProducts
    });
  } catch (error) {
    console.error("Erreur dans /dashboard :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
});

// ✅ Liste des utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('nom email createdAt');
    
    const formattedUsers = users.map((user, index) => ({
      id: user._id,
      name: user.nom || `Utilisateur ${index + 1}`,
      email: user.email,
      dateInscription: new Date(user.createdAt).toLocaleDateString('fr-FR'),
      derniereConnexion: 'Jamais connecté', // Par défaut car pas de champ lastLogin
      status: 'Actif', // Par défaut
      createdAt: user.createdAt
    }));
    
    res.json(formattedUsers);
  } catch (error) {
    console.error("Erreur récupération des utilisateurs :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Statistiques spécifiques aux utilisateurs
router.get('/userstats', async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    const newUsers = await User.countDocuments({ createdAt: { $gte: last30Days } });
    const totalUsers = await User.countDocuments();

    res.json({
      totalUsers,
      newUsers
    });
  } catch (error) {
    console.error("Erreur dans /userstats :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques des utilisateurs" });
  }
});

// 🍩 Produits par catégories
router.get('/products-categories', async (req, res) => {
  try {
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const colors = [
      ['#1A73E8', '#2E8DF7'],
      ['#34A853', '#4FC3F7'],
      ['#EA4335', '#FF6B9D'],
      ['#FBBC04', '#FFD54F'],
      ['#9C27B0', '#BA68C8'],
      ['#FF5722', '#FF8A65'],
      ['#607D8B', '#90A4AE'],
      ['#795548', '#A1887F']
    ];

    const chartData = {
      seriesName: 'Produits par catégorie',
      values: categoryStats.map((item, index) => ({
        name: item._id || 'Sans catégorie',
        value: item.count,
        colors: colors[index % colors.length]
      }))
    };

    console.log('🍩 Stats catégories envoyées :', chartData);
    res.json(chartData);
  } catch (error) {
    console.error("Erreur dans /products-categories :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des catégories" });
  }
});

// 📈 Nouvelle route pour analytics KPI
router.get('/analytics', async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    const totalProducts = await Product.countDocuments();
    const soldProducts = await Product.countDocuments({ 'stock.status': 'vendu' });
    const newProducts = await Product.countDocuments({ createdAt: { $gte: last30Days } });
    const verifiedProducts = await Product.countDocuments({ verified: true });

    const totalUsers = await User.countDocuments();
    const newUsers = await User.countDocuments({ createdAt: { $gte: last30Days } });

    res.json({
      produitsVendus: { titre: "Produits vendus", valeur: soldProducts },
      produitsNeufs: { titre: "Nouveaux produits (30j)", valeur: newProducts },
      produitsVerifies: { titre: "Produits vérifiés", valeur: verifiedProducts },
      nouveauxUtilisateurs: { titre: "Nouveaux utilisateurs (30j)", valeur: newUsers }
    });
  } catch (error) {
    console.error("Erreur /analytics :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des analytics" });
  }
});

router.get('/products-monthly', async (req, res) => {
  try {
    // Créer les 6 derniers mois
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        count: 0
      });
    }

    // Récupérer les vraies données
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Product.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Fusionner avec les mois par défaut
    const result = months.map(month => {
      const found = monthlyStats.find(stat => 
        stat._id.year === month.year && stat._id.month === month.month
      );
      return {
        _id: { year: month.year, month: month.month },
        count: found ? found.count : 0
      };
    });

    console.log('📈 Données mensuelles envoyées :', result);
    res.json(result);
  } catch (error) {
    console.error("Erreur dans /products-monthly :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des produits mensuels" });
  }
});

// ✅ Liste des produits
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().select('name price description category isActive promoted createdAt');
    
    const formattedProducts = products.map((product, index) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category || 'Sans catégorie',
      dateCreation: new Date(product.createdAt).toLocaleDateString('fr-FR'),
      status: product.isActive ? 'Actif' : 'Inactif',
      promoted: product.promoted || false,
      createdAt: product.createdAt
    }));
    
    res.json(formattedProducts);
  } catch (error) {
    console.error("Erreur récupération des produits :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
