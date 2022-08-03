const mongoose = require("mongoose");

const dbConnectionMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Base de datos MongoDb online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la base de datos MongoDb");
  }
};

module.exports = {
    dbConnectionMongo,
};