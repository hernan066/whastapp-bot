const Initial = require("../models/Initial");
const Message = require("../models/Message");
const Response = require("../models/Response");


// Obtengo la option_key de la db
const getDataMongo = async (message = "") => {
  const results = await Initial.find({ message });
  const [response] = results;
  const key = response?.option_key || null;
  console.log('getDataMongo ================', key)
  return key;
};


// Busco em mensaje que coincida con la option_key
const getReplyMongo = async (option_key = "") => {
  const results = await Response.find({ option_key });
  const [response] = results;
  //const respuestaMensaje = response?.replyMessage || "";
  const value = {
    replyMessage: response?.replyMessage || "",
    trigger: response?.trigger || "",
    media: response?.media || "",
    list: response?.list || "",
  };
  console.log('getDataMongo ================', value)
  return value;
};

const getMessagesMongo = async (number) => {
  try {
    const results = await Response.find({ number });
    const [response] = results;

    const value = {
      replyMessage: response?.replyMessage || "",
      trigger: response?.trigger || "",
      media: response?.media || "",
      list: response?.list || "",
    };
    return value;
  } catch (error) {
    console.log(error);
  }
};

const saveMessageMongo = async (message, trigger, number) => {
  const newMessage = new Message({
    message,
    number,
    trigger,
  });

  try {
    const saveMessage = await newMessage.save();
    console.log("Mensaje mongo guardado", saveMessage);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveMessageMongo,
  getDataMongo,
  getReplyMongo,
  getMessagesMongo,
};
