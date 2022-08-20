const { getData, getReply, saveMessageMysql } = require("./mysql");
const { saveMessageJson } = require("./jsonDb");
const { getDataIa } = require("./diaglogflow");
const stepsInitial = require("../flow/initial.json");
const stepsReponse = require("../flow/response.json");
const { saveMessageMongo, getDataMongo, getReplyMongo } = require("./mongoDb");
const { saveOrder } = require("../controllers/order");

const get = (message) =>
  new Promise((resolve, reject) => {
    /**
     * Si no estas usando un gesto de base de datos
     */

    if (process.env.DATABASE === "none") {
      const { key } = stepsInitial.find((k) =>
        k.keywords.includes(message)
      ) || { key: null };
      const response = key || null;
      resolve(response);
    }
    /**
     * Si usas mongoDb
     */

    if (process.env.DATABASE === "mongoDb") {
      const resp = getDataMongo(message);
      resolve(resp);
    }

    /**
     * Si usas MYSQL
     */
    if (process.env.DATABASE === "mysql") {
      getData(message, (dt) => {
        resolve(dt);
      });
    }
  });

const reply = (step) =>
  new Promise((resolve, reject) => {
    /**
     * Si no estas usando un gesto de base de datos
     */
    if (process.env.DATABASE === "none") {
      let resData = { replyMessage: "", media: null, trigger: null };
      const responseFind = stepsReponse[step] || {};
      resData = {
        ...resData,
        ...responseFind,
        replyMessage: responseFind.replyMessage.join(""),
      };
      resolve(resData);
      return;
    }
    /**
     * Si usas MongoDb
     */

    if (process.env.DATABASE === "mongoDb") {
      //let resData = { replyMessage: '', media: null, trigger: null, list: null }

      const resp = getReplyMongo(step);
      resolve(resp);

      /*  getReply(step, (dt) => {
            resData = { ...resData, ...dt }
            resolve(resData)
        }); */
    }

    /**
     * Si usas MYSQL
     */
    if (process.env.DATABASE === "mysql") {
      let resData = { replyMessage: "", media: null, trigger: null };
      getReply(step, (dt) => {
        resData = { ...resData, ...dt };
        resolve(resData);
      });
    }
  });

const getIA = (message) =>
  new Promise((resolve, reject) => {
    /**
     * Si usas dialogflow
     */
    if (process.env.DATABASE === "dialogflow") {
      let resData = { replyMessage: "", media: null, trigger: null };
      getDataIa(message, (dt) => {
        resData = { ...resData, ...dt };
        resolve(resData);
      });
    }
  });

/**
 *
 * @param {*} message
 * @param {*} date
 * @param {*} trigger
 * @param {*} number
 * @returns
 */
const saveMessage = (message, trigger, number) =>
  new Promise(async (resolve, reject) => {
    switch (process.env.DATABASE) {
      case "mongoDb":
        resolve(await saveMessageMongo(message, trigger, number));
        break;

      case "mysql":
        resolve(await saveMessageMysql(message, trigger, number));
        break;
      case "dialogflow":
        if(message.includes("Datos del pedido: -")){
            await saveOrder(number, message)
          }
      
      resolve(await saveMessageMongo(message, trigger, number));
        break;

      /*   
         resolve( await saveMessageJson( message, trigger, number ) )
             break; */

      default:
        resolve(true);
        break;
    }
  });

module.exports = { get, reply, getIA, saveMessage };
