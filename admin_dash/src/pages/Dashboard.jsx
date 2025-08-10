import React, { useEffect, useState } from "react";
import CardKpi from "../components/CardKpi/CardKpi";
import BarChart from "../components/BarChar/BarChar";
import DonutChart from "../components/DunotChar/DunotChar";
import { FaUsers, FaShoppingCart, FaUserPlus } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [monthlyProducts, setMonthlyProducts] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5500/api/stats/dashboard").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5500/api/stats/products-monthly").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5500/api/stats/products-categories").then((res) =>
        res.json()
      ),
    ])
      .then(([statsData, monthlyData, categoriesData]) => {
        setStats(statsData);

        // Transformer les données mensuelles pour BarChart
        const transformedMonthlyData = {
          categories: monthlyData.map((item) => {
            const monthNames = [
              "Janvier",
              "Février",
              "Mars",
              "Avril",
              "Mai",
              "Juin",
              "Juillet",
              "Août",
              "Septembre",
              "Octobre",
              "Novembre",
              "Décembre",
            ];
            return monthNames[item._id.month - 1];
          }),
          values: monthlyData.map((item) => item.count),
          seriesName: "Produits",
        };

        setMonthlyProducts(transformedMonthlyData);
        setCategoriesData(categoriesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !stats || !monthlyProducts || !categoriesData) {
    return <p className="text-white">Chargement des statistiques...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F9FAFB] mb-2">
          Tableau de bord
        </h1>
        <p className="text-[#A0A0A0]">
          Aperçu des performances de votre plateforme
        </p>
      </div>

      {/* Grille de cartes KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <CardKpi
          title="Nombre d'Utilisateurs"
          amount={stats.totalUsers}
          icon={<FaUsers />}
          trend="up"
          trendValue="+12%"
          color="blue"
          indice=""
        />

        <CardKpi
          title="Produits Promus"
          amount={stats.promotedProducts}
          icon={<CiShoppingCart />}
          trend="up"
          trendValue="+12%"
          color="green"
          indice=""
        />

        <CardKpi
          title="Nouveaux Produits"
          amount={stats.newProducts}
          icon={<FaShoppingCart />}
          trend="up"
          trendValue="+12%"
          color="purple"
          indice=""
        />

        <CardKpi
          title="Nouveaux Utilisateurs"
          amount={stats.newUsers}
          icon={<FaUserPlus />}
          trend="up"
          trendValue="+12%"
          color="orange"
          indice=""
        />
      </div>

      {/* Graphiques */}
      <div className="grid  gap-6">
        {/* Graphique des produits publiés par mois */}
        <div className="w-full">
          <BarChart
            title="Produits Publiés par Mois"
            data={monthlyProducts}
            height={400}
          />
        </div>

        {/* Graphique de répartition par catégories */}
        {/* <div className="w-full">
          <DonutChart
            title="Répartition des Produits par Catégories"
            data={categoriesData}
            height={400}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
