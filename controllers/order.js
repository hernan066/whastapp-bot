const Order = require("../models/Order");

const saveOrder = async (number, str) => {
  
  const order = str.split("-")

  const newOrder = new Order({
    state: "activa",
    number: number,
    products: order[1].trim(),
    name: order[2].trim(),
    address: order[3].trim(),
    date: Date.now()
  });

  try {
    await newOrder.save();
    console.log("Orden guardada>>>>>>");
  } catch (error) {
    console.log(error);
  }
};
const consultarOrder = async (number) => {
  const results = await Order.find({ number, state: "active" });
  //console.log("result=============", results);

  if (results.length > 0) {
    return true;
  } else {
    return false;
  }
};
const actualizarOrder = async (number, step) => {
  const results = await Order.findOneAndUpdate({ number }, { step: step });
  console.log(results);
};
const agregarProducto = async (number, product) => {
  
  
  const results = await Order.findOneAndUpdate({ number }, { product: [...product] });
  console.log(results);
};
const agregarNombre = async (number, name) => {
  
  
  const results = await Order.findOneAndUpdate({ number }, { name});
  console.log(results);
};

module.exports = { saveOrder, consultarOrder, actualizarOrder, agregarProducto, agregarNombre };
