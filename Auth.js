import { google } from 'googleapis';
import * as fs from 'fs';

// Chargez votre fichier JSON d'authentification OAuth 2.0
const credentials = JSON.parse(fs.readFileSync('client_secret.json', 'utf8'));
console.log('Fichier JSON d\'authentification chargé avec succès:', credentials);

// L'ID de votre propriété GA4
const PROPERTY_ID = 'G-X980YHR4BN';

// Initialisation du client OAuth 2.0 avec les informations du fichier JSON
const { client_id, client_secret, redirect_uris } = credentials.web;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Générez l'URL de consentement pour l'utilisateur
const consentUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/analytics.readonly'],
});

console.log('Visitez ce lien pour autoriser l\'application:', consentUrl);

// Après que l'utilisateur autorise l'application, vous recevrez un code d'autorisation
// Une fois que vous avez ce code, échangez-le contre un token d'accès
async function getAccessToken(code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Token d\'accès obtenu:', tokens);
    return tokens.access_token;
  } catch (error) {
    console.error('Erreur lors de l\'obtention du token:', error);
    throw error;
  }
}

// Exemple d'appel à la fonction getAccessToken avec un code d'autorisation
// getAccessToken('votre_code_d_authorisation');
