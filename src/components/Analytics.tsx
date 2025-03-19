import React, { useEffect, useState } from 'react';

interface AnalyticsData {
  pageViews: number;
  sessions: number;
  avgSessionDuration: string;
  bounceRate: string;
  activeUsers: number;
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData>({
    pageViews: 0,
    sessions: 0,
    avgSessionDuration: '0:00',
    bounceRate: '0%',
    activeUsers: 0
  });

  useEffect(() => {
    // Push analytics event to dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'adminPageView',
        page: {
          path: window.location.pathname,
          title: 'Admin Dashboard'
        }
      });
    }

    // Set up event listener for GTM events
    const handleGTMEvent = (event: any) => {
      if (event.data && event.data.type === 'gtm.analytics') {
        setData(prevData => ({
          ...prevData,
          ...event.data.metrics
        }));
      }
    };

    window.addEventListener('message', handleGTMEvent);

    return () => {
      window.removeEventListener('message', handleGTMEvent);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Page Views</h3>
          <p className="text-3xl font-bold text-gold-600">{data.pageViews}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Sessions</h3>
          <p className="text-3xl font-bold text-gold-600">{data.sessions}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Avg. Session Duration</h3>
          <p className="text-3xl font-bold text-gold-600">{data.avgSessionDuration}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Bounce Rate</h3>
          <p className="text-3xl font-bold text-gold-600">{data.bounceRate}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
        <p className="text-3xl font-bold text-gold-600">{data.activeUsers}</p>
        <p className="text-sm text-gray-500 mt-2">Updated every minute</p>
      </div>
    </div>
  );
};

export default Analytics;