require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require('path');
// Necesarios para conectar a la api de whatsapp
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
//DBs
const mysqlConnection = require("./config/mysql");
const { dbConnectionMongo } = require("./config/mongoDb");
//controllers
const {
  generateImage,
  cleanNumber,
  checkEnvFile,
  isValidNumber,
} = require("./controllers/handle");
const { connectionReady } = require("./controllers/connection");
const { saveMedia } = require("./controllers/save");
const {
  getMessages,
  responseMessages,
  bothResponse,
} = require("./controllers/flows");
const {
  sendMedia,
  sendMessage,
  lastTrigger,
  readChat,
} = require("./controllers/send");




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
const server = require("http").Server(app);
//const MULTI_DEVICE = process.env.MULTI_DEVICE || 'true'; //Ahora son todos multi device

const port = process.env.PORT || 3000;
var client;

//Rutas
app.use("/", require("./routes/web"));
app.use('/api/flow', require("./routes/flowDb"))
app.use('/api/message', require("./routes/message"))
//app.use('/api/user', require("./routes/user"))

//Escuchamos cuando entre un mensaje
const listenMessage = () =>
  client.on("message", async (msg) => {
    const { from, body, hasMedia } = msg;

    console.log("Mensaje de respuesta", from, body);

    if (!isValidNumber(from)) {
      return;
    }

    // Este es (bug) para evitar que se publiquen estados
    if (from === "status@broadcast") {
      return;
    }
    message = body.toLowerCase();
    console.log("BODY", message);
    const number = cleanNumber(from);
    await readChat(number, message);

    //Guardamos el archivo multimedia que envia

    if (process.env.SAVE_MEDIA && hasMedia) {
      const media = await msg.downloadMedia();
      saveMedia(media);
    }

    //Dialogflow
    if (process.env.DATABASE === "dialogflow") {
      if (!message.length) return;
      const response = await bothResponse(message);

      //console.log(response);
      await sendMessage(client, from, response.replyMessage);
      if (response.media) {
        sendMedia(client, from, response.media);
      }
      return;
    }

    //Agregar mas pasos aca de ser necesarios

    //...

    //Agregar mas pasos aca de ser necesarios

    const lastStep = (await lastTrigger(from)) || null;
    if (lastStep) {
      const response = await responseMessages(lastStep);
      await sendMessage(client, from, response.replyMessage);
    }

    //Respondemos al primero paso si encuentra palabras clave
    const step = await getMessages(message);

    if (step) {
      const response = await responseMessages(step);

      await sendMessage(client, from, response.replyMessage, response.trigger);

      if (!response.delay && response.media) {
        sendMedia(client, from, response.media);
      }
      if (response.delay && response.media) {
        setTimeout(() => {
          sendMedia(client, from, response.media);
        }, response.delay);
      }
      return;
    }

    //Si quieres tener un mensaje por defecto
    if (process.env.DEFAULT_MESSAGE === "true") {
      const response = await responseMessages("DEFAULT");

      console.log("opcion por defecto",response)
      await sendMessage(client, from, response.replyMessage, response.trigger);

      return;
    }
  });

client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.on("qr", (qr) =>
  generateImage(qr, () => {
    qrcode.generate(qr, { small: true });

    console.log(`Ver QR http://localhost:${port}/qr`);
    socketEvents.sendQR(qr);
  })
);

client.on("ready", (a) => {
  connectionReady();
  listenMessage();
  // socketEvents.sendStatus(client)
});

client.on("auth_failure", (e) => {
  // console.log(e)
  // connectionLost()
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.initialize();

//Verificamos la si hay conectada una db
if (process.env.DATABASE === "mysql") {
  mysqlConnection.connect();
}
if (process.env.DATABASE === "mongoDb") {
  dbConnectionMongo();
}

server.listen(port, () => {
  console.log(`El server esta listo por el puerto ${port}`);
});
checkEnvFile();
