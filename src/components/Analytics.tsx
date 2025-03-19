import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';
import * as path from 'path';

// async function getGA4AnalyticsData() {
//   const analyticsdata = google.analyticsdata('v1beta');

//   // Remplacez le chemin par l'endroit où vous avez placé votre fichier JSON
//   const authClient = await google.auth.getClient({
//     keyFile: path.join(__dirname, './luxury-resort.json'),  // Mettez le bon chemin vers votre fichier JSON
//     scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
//   });

//   const request = {
//     property: 'properties/482432448',  // ID de la propriété GA4
//     dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
//     metrics: [
//       { name: 'sessions' },
//       { name: 'pageViews' },
//       { name: 'totalEvents' }
//     ],
//     dimensions: [{ name: 'date' }]
//   };

//   const response = await analyticsdata.properties.runReport({
//     auth: authClient,
//     requestBody: request
//   });

//   return response.data;
// }

// export default getGA4AnalyticsData;

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
    bounceRate: '0%'
  });

  useEffect(() => {
    // Cette fonction serait appelée quand le composant Google Analytics est chargé
    const initializeAnalytics = () => {
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
          event: 'adminPageView',
          page: {
            path: window.location.pathname,
            title: 'Admin Dashboard'
          }
        });
      }
    };

    initializeAnalytics();
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
        <h3 className="text-lg font-semibold text-gray-700">durée de la session</h3>
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