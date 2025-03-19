import axios from "axios";

const CLIENT_ID = "TON_CLIENT_ID";
const CLIENT_SECRET = "TON_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:5173/admin";
const AUTH_CODE = "4/0AQSTgQFrLXhq5gCumYn75wRQ9b1doxLG2FSZ0VLFb73CI5Y8hyHDGtx3d15cmDvnvPnX7g";

async function getAccessToken() {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code: AUTH_CODE,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    console.log("✅ ACCESS_TOKEN :", response.data.access_token);
    console.log("🔄 REFRESH_TOKEN :", response.data.refresh_token);
  } catch (error) {
    console.error("❌ Erreur lors de l'obtention du token :", error.response.data);
  }
}

getAccessToken();
