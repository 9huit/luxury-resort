// googleAnalytics.js
import axios from 'axios';
import { signIn } from './googleAuth';

// URL de l'API Google Analytics Data
const API_URL = `https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport`;

interface MetricValue {
  value: string;
}

interface AnalyticsRow {
  metricValues: MetricValue[];
}

interface AnalyticsResponse {
  rows?: AnalyticsRow[];
}

export const fetchAnalyticsData = async (): Promise<{ pageViews: number; sessions: number; avgSessionDuration: string; bounceRate: string }> => {
  try {
    // Obtenir le token d'accès OAuth2
    const accessToken = await signIn();
    if (!accessToken) {
      throw new Error("Le token d'accès est invalide ou absent.");
    }

    // Effectuer la requête avec Axios
    const response = await axios.post<AnalyticsResponse>(
      API_URL.replace("{PROPERTY_ID}", import.meta.env.VITE_GA4_PROPERTY_ID),
      {
        metrics: [
          { name: "screenPageViews" },
          { name: "sessions" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("✅ Données reçues de Google Analytics:", response.data);

    // Vérifier si les données sont valides
    const rows = response.data.rows;
    if (!rows || rows.length === 0) {
      throw new Error("Aucune donnée disponible.");
    }

    // Extraire les données
    const [pageViews, sessions, avgSessionDuration, bounceRate] =
      rows[0].metricValues.map((m: MetricValue) => m.value) || ['0', '0', '0', '0'];

    // Retourner les données extraites et formatées
    return {
      pageViews: parseInt(pageViews, 10),
      sessions: parseInt(sessions, 10),
      avgSessionDuration: formatDuration(parseFloat(avgSessionDuration)),
      bounceRate: parseFloat(bounceRate).toFixed(2) + '%',
    };

  } catch (error) {
    console.error("❌ Erreur lors de la récupération des données GA4:", error);
    throw error;
  }
};

// Fonction pour formater la durée (secondes → mm:ss)
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec.toString().padStart(2, '0')}`;
};
