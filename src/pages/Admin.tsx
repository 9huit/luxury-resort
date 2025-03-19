import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import getGA4AnalyticsData  from '../components/Analytics';

const Admin = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const analyticsData = await getGA4AnalyticsData();
      setData(analyticsData);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Luxury Resort</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Se deconnecter
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-serif mb-6">Présentation d’Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-lg font-semibold text-gray-700">Vue de la page</h3>
//         <p className="text-3xl font-bold text-gold-600">{data.rows?.[0]?.[1]}</p>
//       </div>
      
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-lg font-semibold text-gray-700">Sessions</h3>
//         <p className="text-3xl font-bold text-gold-600">{data.rows?.[0]?.[0]}</p>
//       </div>
      

//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-lg font-semibold text-gray-700">Evenement (Bouton reserver)</h3>
//         <p className="text-3xl font-bold text-gold-600">{data.rows?.[0]?.[2]}</p>
//       </div>
//     </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-serif mb-4">Tag Manager</h2>
          <p className="text-gray-600 mb-4">Événements GTM récents:</p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Événements
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date et heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Vue de la page
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date().toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    /admin
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;