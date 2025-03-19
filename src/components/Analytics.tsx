import React, { useEffect, useState } from 'react';
import { fetchAnalyticsData } from '../store/Api'; // Importer la fonction depuis Api.ts
import { FaEye, FaChartLine, FaClock, FaPercentage } from 'react-icons/fa';

interface AnalyticsData {
  pageViews: number;
  sessions: number;
  avgSessionDuration: string;
  bounceRate: string;
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAnalyticsData();
        console.log('Données de GA:', result);

        if (!result || typeof result !== 'object') {
          throw new Error('Données invalides');
        }

        setData({
          pageViews: result.pageViews || 0,
          sessions: result.sessions || 0,
          avgSessionDuration: result.avgSessionDuration || '0:00',
          bounceRate: result.bounceRate || '0%',
        });
      } catch (error) {
        console.error('Erreur de récupération des données:', error);
        setError("Impossible de charger les données Google Analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">📊 Chargement des statistiques...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">❌ {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Page Views */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <FaEye className="text-4xl text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Vues de la page</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.pageViews}</p>
        </div>
      </div>

      {/* Sessions */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <FaChartLine className="text-4xl text-green-500" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Sessions</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.sessions}</p>
        </div>
      </div>

      {/* Durée moyenne des sessions */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <FaClock className="text-4xl text-orange-500" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Durée de session</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.avgSessionDuration}</p>
        </div>
      </div>

      {/* Taux de rebond */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <FaPercentage className="text-4xl text-red-500" />
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Taux de rebond</h3>
          <p className="text-3xl font-bold text-gray-800">{data?.bounceRate}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
