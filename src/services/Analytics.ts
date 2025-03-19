import { google } from 'googleapis';

const analytics = google.analytics('v3');

// Configuration des identifiants OAuth 2.0
const auth = new google.auth.OAuth2(
  import.meta.env.VITE_GOOGLE_CLIENT_ID,
  import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
  import.meta.env.VITE_GOOGLE_REDIRECT_URI
);

interface AnalyticsData {
  pageViews: number;
  sessions: number;
  avgSessionDuration: string;
  bounceRate: string;
}

export const getAnalyticsData = async (viewId: string): Promise<AnalyticsData> => {
  try {
    const response = await analytics.data.ga.get({
      auth,
      ids: `ga:${viewId}`,
      'start-date': '30daysAgo',
      'end-date': 'today',
      metrics: 'ga:pageviews,ga:sessions,ga:avgSessionDuration,ga:bounceRate'
    });

    const [pageViews, sessions, avgSessionDuration, bounceRate] = response.data.rows?.[0] || [];

    return {
      pageViews: parseInt(pageViews || '0'),
      sessions: parseInt(sessions || '0'),
      avgSessionDuration: formatDuration(parseFloat(avgSessionDuration || '0')),
      bounceRate: `${parseFloat(bounceRate || '0').toFixed(2)}%`
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return {
      pageViews: 0,
      sessions: 0,
      avgSessionDuration: '0:00',
      bounceRate: '0%'
    };
  }
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getRealtimeUsers = async (viewId: string): Promise<number> => {
  try {
    const response = await analytics.data.realtime.get({
      auth,
      ids: `ga:${viewId}`,
      metrics: 'rt:activeUsers'
    });

    return parseInt(response.data.rows?.[0]?.[0] || '0');
  } catch (error) {
    console.error('Error fetching realtime users:', error);
    return 0;
  }
};