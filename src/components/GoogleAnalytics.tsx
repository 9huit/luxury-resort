import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-X980YHR4BN"; // Remplace par ton propre ID

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID); // Initialisation de Google Analytics
    ReactGA.send({ page_path: location.pathname });
  }, [location]); // Se déclenche à chaque changement d'URL

  return null; // Pas d'affichage
};

export default GoogleAnalytics;
