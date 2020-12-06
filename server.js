/**
 * file che utilizza l'estensione dei pacchetti pacchetti :
 * express@4.16.3 , connect-history-api-fallback@1.5.0 , https@1.0.0
 * appena aggiunti per creare un server HTTP e HTTPS che includa la funzionalità
 * del json-server e che fornirà il servizio web RESTful.
 */

const express = require("express");
const https = require("https");
const fs = require("fs");
const history = require("connect-history-api-fallback");
const jsonServer = require("json-server");
const bodyParser = require('body-parser');
const auth = require("./authMiddleware");
const router = jsonServer.router("serverdata.json");

// const enableHttps = true;
const enableHttps = false;

const ssloptions = {}

if (enableHttps) {
  ssloptions.cert = fs.readFileSync("./ssl/sportsstore.crt");
  ssloptions.key = fs.readFileSync("./ssl/sportsstore.pem");
}
const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static("./dist/SportsStore"));
app.listen(80,
  () => console.log("HTTP Server running on port 80"));
if (enableHttps) {
  https.createServer(ssloptions, app).listen(443,
    () => console.log("HTTPS Server running on port 443"));
} else {
  console.log("HTTPS disabled")
}
/**
 * Il server è configurato per leggere i dettagli del certificato SSL / TLS dai file nella cartella ssl,
 * che è dove dovresti posizionare i file per il tuo certificato. Se non hai un certificato, puoi
 * disabilitare HTTPS impostando il valore enableHttps su false. Sarai comunque in grado di testare
 * l'applicazione utilizzando il local server, ma non sarai in grado di utilizzare le funzionalità
 * progressive nella distribuzione.
 */
