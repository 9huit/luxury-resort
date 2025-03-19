import { useState, useEffect } from 'react';
import axios from 'axios';

interface AnalyticsData {
  pageViews: number;
  sessions: number;
  avgSessionDuration: string;
  bounceRate: string;
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData>({
    pageViews: 0,
    sessions: 0,
    avgSessionDuration: '0:00',
    bounceRate: '0%',
  });

  useEffect(() => {
    axios.get('https://luxury-resort-git-main-9huits-projects.vercel.app/api/analytics')
      .then((res) => {
        if (res.data && res.data.rows) {
          const metrics = res.data.rows[0].metricValues;
          setData({
            pageViews: parseInt(metrics[0]?.value ?? '0'),
            sessions: parseInt(metrics[1]?.value ?? '0'),
            avgSessionDuration: metrics[2]?.value ?? '0:00',
            bounceRate: metrics[3]?.value + '%',
          });
        }
      })
      .catch((err) => console.error('Erreur récupération analytics:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Vue de la page</h3>
        <p className="text-3xl font-bold text-gold-600">{data.pageViews}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Sessions</h3>
        <p className="text-3xl font-bold text-gold-600">{data.sessions}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Durée de la session</h3>
        <p className="text-3xl font-bold text-gold-600">{data.avgSessionDuration}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Taux de rebond</h3>
        <p className="text-3xl font-bold text-gold-600">{data.bounceRate}</p>
      </div>
    </div>
  );
};

export default Analytics;
