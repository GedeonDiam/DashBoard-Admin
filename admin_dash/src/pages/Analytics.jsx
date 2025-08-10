import CardKpi from '../components/CardKpi/CardKpi';
import React, { useEffect, useState } from "react";
import { FaUsers, FaShoppingCart, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5500/api/stats/analytics")
      .then((res) => res.json())
      .then((data) => {
        setAnalyticsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !analyticsData) {
    return <p className="text-white">Chargement des analyses...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F9FAFB] mb-2">
          Zone Analytique
        </h1>
        <p className="text-[#A0A0A0]">
          Aperçu des performances de votre plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <CardKpi
          title={analyticsData.produitsVendus.titre}
          amount={analyticsData.produitsVendus.valeur}
          icon={<FaShoppingCart />}
          trend="up"
          trendValue="+5%"
          color="blue"
        />

        <CardKpi
          title={analyticsData.produitsNeufs.titre}
          amount={analyticsData.produitsNeufs.valeur}
          icon={<FaBoxOpen />}
          trend="up"
          trendValue="+8%"
          color="green"
        />

        <CardKpi
          title={analyticsData.produitsVerifies.titre}
          amount={analyticsData.produitsVerifies.valeur}
          icon={<FaCheckCircle />}
          trend="up"
          trendValue="+3%"
          color="purple"
        />

        <CardKpi
          title={analyticsData.nouveauxUtilisateurs.titre}
          amount={analyticsData.nouveauxUtilisateurs.valeur}
          icon={<FaUsers />}
          trend="up"
          trendValue="+10%"
          color="orange"
        />
      </div>
    </div>
  );
};

export default Analytics;
