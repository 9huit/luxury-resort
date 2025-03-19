"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var googleapis_1 = require("googleapis");
var fs = require("fs");
// Charge le fichier JSON d'authentification OAuth 2.0
var credentials = JSON.parse(fs.readFileSync('client_secret.json', 'utf8'));
var _a = credentials.web, client_id = _a.client_id, client_secret = _a.client_secret, redirect_uris = _a.redirect_uris;
// Crée un client OAuth2
var oauth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
// Exemple de fonction pour obtenir le token d'accès
function getAccessToken(code) {
    return __awaiter(this, void 0, void 0, function () {
        var tokens, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, oauth2Client.getToken(code)];
                case 1:
                    tokens = (_a.sent()).tokens;
                    oauth2Client.setCredentials(tokens);
                    console.log('Token d\'accès obtenu:', tokens.access_token);
                    return [2 /*return*/, tokens.access_token];
                case 2:
                    error_1 = _a.sent();
                    console.error('Erreur lors de l\'obtention du token:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Supposons que tu récupères le code d'autorisation depuis l'URL
var authorizationCode = "4/0AQSTgQFrLXhq5gCumYn75wRQ9b1doxLG2FSZ0VLFb73CI5Y8hyHDGtx3d15cmDvnvPnX7g";
// Échange le code d'autorisation contre un token d'accès
getAccessToken(authorizationCode)
    .then(function (token) {
    // Maintenant, tu peux utiliser ce token pour tes requêtes à l'API
    console.log("Utilise ce token pour l'API :", token);
})
    .catch(function (error) {
    console.error("Erreur :", error);
});
