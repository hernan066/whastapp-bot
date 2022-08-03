const Message = require("../models/Message");

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
};
