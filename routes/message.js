const express = require("express");
const { getAllmessages, getAllmessagesByNumber } = require("../controllers/massege");
const router = express.Router();

// /api/message

/* -------message-------- */

//mostrar todos los mensajes paginados
// /api/message?limit=20&init=10
router.get("/", getAllmessages);

//mostrar todos los mensajes de un numero
router.get("/:number", getAllmessagesByNumber);

module.exports = router;
