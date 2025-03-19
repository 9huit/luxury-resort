import gapi from 'gapi-script';

// Définition de l'interface pour l'instance de l'authentification Google
interface AuthInstance {
  signIn: () => Promise<any>;
  signOut: () => Promise<void>;
  getAuthResponse: () => { access_token: string };
}

// Initialisation de l'authentification OAuth2
export const initAuth = (): Promise<AuthInstance> => {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,  // Ton client ID OAuth2
      }).then(() => {
        resolve(gapi.auth2.getAuthInstance());
      }).catch((error: Error) => {
        reject(error);
      });
    });
  });
};

// Connexion avec OAuth2
export const signIn = async (): Promise<string> => {
  const authInstance = await initAuth();
  const user = await authInstance.signIn();
  return user.getAuthResponse().access_token; // Récupère le token d'accès OAuth2
};

// Déconnexion
export const signOut = async (): Promise<void> => {
  const authInstance = await initAuth();
  await authInstance.signOut();
};
