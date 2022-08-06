const express = require("express");
const router = express.Router();
const {
  initialPost,
  responsePost,
  initialGet,
  responseGet,
  initialPut,
  initialDelete,
  responseDelete,
  responsePut,
} = require("../controllers/flowDb");

// /api
//mostrar
router.get("/initial", initialGet);
router.get("/response", responseGet);
//crear
router.post("/initial", initialPost);
router.post("/response", responsePost);
//editar
router.put("/initial/:id", initialPut);
router.put("/response/:id", responsePut);
//borrar
router.delete("/initial/:id", initialDelete);
router.delete("/response/:id", responseDelete);

module.exports = router;
