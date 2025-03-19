import axios from 'axios';

// Récupère le token d'accès OAuth 2.0 (vous pouvez aussi l'obtenir via une variable d'environnement)

// ID de la propriété GA4
const PROPERTY_ID = '482635516';  // Votre Property ID GA4

// URL de l'API Google Analytics Data
const API_URL = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;

// Définition des interfaces pour les types de données attendus
interface MetricValue {
  value: string;
}

interface AnalyticsRow {
  metricValues: MetricValue[];
}

interface AnalyticsResponse {
  rows?: AnalyticsRow[];
}
const ACCESS_TOKEN = 'ya29.a0AeXRPp4XUcz7DaGJiKe8Z2vm_awPFqIfRMDZ05niFa5Wn-He8uimopLq-_UjwaYzAAZqpJxyOmMQZp0And9zcJA_Ea1r5zU49MgFhybGoR0D_GIFEI2JpBTZPBB2XcH7rVots9wtloEzvpYuF2lbftTWhHU_wdyXrTc8xOgraCgYKAQMSARMSFQHGX2MiIo4T107tlnbS3Jl2PV2GPA0175';  // Remplacez par votre token d'accès obtenu via OAuth 2.0

// Fonction pour récupérer les données Google Analytics
export const fetchAnalyticsData = async () => {
  try {
    console.log("🏠 ID Propriété GA4:", PROPERTY_ID);
    console.log("🔑 Token d'accès:", ACCESS_TOKEN);

    const response = await axios.post<AnalyticsResponse>(
      API_URL,
      {
        "metrics": [
          { "name": "screenPageViews" },
          { "name": "sessions" },
          { "name": "averageSessionDuration" },
          { "name": "bounceRate" }
        ],
        "dateRanges": [
          {
            "startDate": "2023-01-01",  // Date de début
            "endDate": "2025-12-31"     // Date de fin
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Données reçues de Google Analytics:", response.data);

    // Vérifier si les données sont valides
    if (!response.data || !response.data.rows || response.data.rows.length === 0) {
      throw new Error("Données Analytics non valides !");
    }

    // Extraire les valeurs des métriques
    const [pageViews, sessions, avgSessionDuration, bounceRate] =
      response.data.rows[0].metricValues.map((m: MetricValue) => m.value) || [0, 0, '0', '0'];

    return {
      pageViews: parseInt(pageViews, 10),
      sessions: parseInt(sessions, 10),
      avgSessionDuration: formatDuration(parseFloat(avgSessionDuration)),
      bounceRate: parseFloat(bounceRate).toFixed(2) + '%'
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
