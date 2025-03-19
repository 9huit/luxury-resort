import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';
import * as path from 'path';

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
    const fetchAnalyticsData = async () => {
      try {
        // Assurez-vous de remplacer par votre propre clé API ou token d'accès OAuth
        const analytics = google.analyticsdata('v1beta');
        const res = await analytics.properties.runReport({
          property: `properties/482432448`,  // Remplace par ton ID de propriété
          requestBody: {
            dateRanges: [
              {
                startDate: '2023-01-01',
                endDate: '2026-12-31',
              },
            ],
            metrics: [
              { name: 'pageviews' },
              { name: 'sessions' },
              { name: 'averageSessionDuration' },
              { name: 'bounceRate' },
            ],
          },
        });
 // Vérification de l'existence des données dans la réponse
 if (res.data.rows && res.data.rows[0] && res.data.rows[0].metricValues) {
  const metrics = res.data.rows[0].metricValues;

  setData({
    pageViews: metrics[0]?.value ? parseInt(metrics[0].value) : 0, // Si la valeur est définie, on la parse, sinon on met 0
    sessions: metrics[1]?.value ? parseInt(metrics[1].value) : 0,
    avgSessionDuration: metrics[2]?.value || '0:00', // Valeur par défaut si undefined
    bounceRate: metrics[3]?.value || '0%', // Valeur par défaut si undefined
  });
} else {
  console.error('Aucune donnée disponible dans la réponse de l\'API');
  // Si aucune donnée n'est disponible, on met des valeurs par défaut
  setData({
    pageViews: 0,
    sessions: 0,
    avgSessionDuration: '0:00',
    bounceRate: '0%',
  });
}
} catch (error) {
console.error("Erreur lors de la récupération des données Analytics:", error);
}
};

fetchAnalyticsData();
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
<h3 className="text-lg font-semibold text-gray-700">Durée moyenne de la session</h3>
<p className="text-3xl font-bold text-gold-600">{data.avgSessionDuration}</p>
</div>

<div className="bg-white p-6 rounded-lg shadow">
<h3 className="text-lg font-semibold text-gray-700">Bounce Rate</h3>
<p className="text-3xl font-bold text-gold-600">{data.bounceRate}</p>
</div>
</div>
);
};

export default Analytics;