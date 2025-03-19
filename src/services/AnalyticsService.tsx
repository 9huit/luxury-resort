import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config(); // Charge les variables d'environnement

const analytics = google.analyticsdata({
  version: 'v1beta',
  auth: process.env.GOOGLE_API_KEY,
});

const propertyId = 'G-X980YHR4BN'; // Remplace par ton ID Google Analytics 4

export const getAnalyticsData = async () => {
  try {
    const response = await analytics.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
        dimensions: [{ name: 'pagePath' }],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données Analytics:', error);
    return null;
  }
};
