 const chartData = {
    categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    values: [12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000, 30000, 28000, 33000, 38000],
    seriesName: 'Ventes mensuelles'
  };

  // Données pour le graphique donut
  const donutData = {
    seriesName: 'Répartition des ventes',
    values: [
      { 
        value: 35, 
        name: 'Standard', 
        colors: ['#1A73E8', '#2E8DF7'] 
      },
      { 
        value: 28, 
        name: 'VIP', 
        colors: ['#10B981', '#34D399'] 
      },
      { 
        value: 22, 
        name: 'Premium', 
        colors: ['#8B5CF6', '#A78BFA'] 
      },
      { 
        value: 15, 
        name: 'Particuliers', 
        colors: ['#F59E0B', '#FBBF24'] 
      }
    ]
  };

  // Données simulées pour les top utilisateurs
  const topUsers = [
    { id: 1, name: "Jean Dupont", email: "jean.dupont@email.com", orders: 45, spent: "125,430", status: "VIP", avatar: "JD" },
    { id: 2, name: "Marie Martin", email: "marie.martin@email.com", orders: 32, spent: "89,250", status: "Premium", avatar: "MM" },
    { id: 3, name: "Pierre Durand", email: "pierre.durand@email.com", orders: 28, spent: "67,890", status: "Standard", avatar: "PD" },
    { id: 4, name: "Sophie Bernard", email: "sophie.bernard@email.com", orders: 24, spent: "56,780", status: "Premium", avatar: "SB" }
  ];

  // Données simulées pour les top produits
  const topProducts = [
    { id: 1, name: "iPhone 15 Pro", category: "Électronique", sold: 234, revenue: "2,340,000", stock: 45, rating: 4.8 },
    { id: 2, name: "MacBook Air M3", category: "Informatique", sold: 156, revenue: "1,872,000", stock: 23, rating: 4.9 },
    { id: 3, name: "AirPods Pro", category: "Audio", sold: 445, revenue: "1,335,000", stock: 78, rating: 4.7 },
    { id: 4, name: "iPad Pro", category: "Tablettes", sold: 189, revenue: "1,134,000", stock: 34, rating: 4.6 }
  ];

  
  // Données simulées pour les commandes récentes
  const recentOrders = [
    { id: "#CMD-1234", customer: "Jean Dupont", amount: "2,450", status: "Livré", time: "Il y a 2h", product: "iPhone 15 Pro" },
    { id: "#CMD-1235", customer: "Marie Martin", amount: "1,890", status: "En cours", time: "Il y a 4h", product: "MacBook Air M3" },
    { id: "#CMD-1236", customer: "Pierre Durand", amount: "450", status: "Expédié", time: "Il y a 6h", product: "AirPods Pro" },
    { id: "#CMD-1237", customer: "Sophie Bernard", amount: "3,200", status: "Confirmé", time: "Il y a 1j", product: "iPad Pro" }
  ];

  // Données pour graphique des inscriptions utilisateurs
  const userRegistrations = {
    categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    values: [45, 52, 38, 67, 89, 76, 43],
    seriesName: 'Nouvelles inscriptions'
  };

  // Données pour répartition géographique
  const geographicData = {
    seriesName: 'Utilisateurs par région',
    values: [
      { value: 45, name: 'Dakar', colors: ['#1A73E8', '#2E8DF7'] },
      { value: 25, name: 'Thiès', colors: ['#10B981', '#34D399'] },
      { value: 15, name: 'Saint-Louis', colors: ['#8B5CF6', '#A78BFA'] },
      { value: 15, name: 'Autres', colors: ['#F59E0B', '#FBBF24'] }
    ]
  };
