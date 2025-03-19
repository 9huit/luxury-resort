import express from 'express';
import { google } from 'googleapis';
import { readFile } from 'fs/promises';
import cors from 'cors';

const app = express();
const port = 3001;

// Permettre CORS pour ton domaine spécifique (remplace par l'URL de ton front-end)
app.use(cors({
  origin: 'https://luxury-resort-git-main-9huits-projects.vercel.app', // Par défaut, Vite est sur http://localhost:3000
}));

// Fonction pour authentifier Google Analytics
async function authenticateGoogleAnalytics() {
  const credentials = JSON.parse(
    await readFile('./config/credentials.json', 'utf8')
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  return google.analyticsdata({ version: 'v1beta', auth });
}

// Route pour récupérer les statistiques
app.get('/analytics', async (req, res) => {
  try {
    const analytics = await authenticateGoogleAnalytics();
    const response = await analytics.properties.runReport({
      property: 'properties/482432448', // Remplace "XXXXX" par ton Property ID (Google Analytics)
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Erreur API Google Analytics :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
