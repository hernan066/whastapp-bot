const Initial = require("../models/Initial");
const Response = require("../models/Response");

//crear initial
const initialPost = async (req, res) => {
  const { keywords, option_key } = req.body;

  const initial = new Initial({
    option_key,
    keywords,
  });

  //Guardar de BD

  await initial.save();

  res.json({
    initial,
  });
};

// Consultar todos los initial
const initialGet = async (req, res) => {
  try {
    initial = await Initial.find();

    res.status(200).json(initial);
  } catch (error) {
    res.status(500).json(err);
  }
};
// Editar initial
const initialPut = async (req, res) => {
  const { id } = req.params;
  const { _id, option_key, keywords } = req.body;

  const initial = await Initial.findByIdAndUpdate(id, { option_key, keywords });

  res.json(initial);
};
//Delete initial
const initialDelete = async (req, res) => {
  const { id } = req.params;

  // Fisicamente lo borramos
  const initial = await Initial.findByIdAndDelete(id);

  res.json(initial);
};

//crear los response
const responsePost = async (req, res) => {
  const { option_key, replyMessage, trigger, media, list } = req.body;

  const response = new Response({
    option_key,
    replyMessage,
    trigger,
    media,
    list,
  });

  //Guardar de BD

  await response.save();

  res.json({
    response,
  });
};
// Consultar todos los initial
const responseGet = async (req, res) => {
  try {
    initial = await Response.find();
    res.status(200).json(initial);
  } catch (error) {
    res.status(500).json(err);
  }
};

// Edit response
const responsePut = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const response = await Response.findByIdAndUpdate(id, { ...resto });

  res.json(response);
};

//Delete initial
const responseDelete = async (req, res) => {
  const { id } = req.params;

  const response = await Response.findByIdAndDelete(id);

  res.json(response);
};

module.exports = {
  initialDelete,
  initialGet,
  initialPost,
  initialPut,
  responseDelete,
  responseGet,
  responsePost,
  responsePut,
};
