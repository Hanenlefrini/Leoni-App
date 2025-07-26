const express = require("express");
const router = express.Router();
const anomaliesController = require("../controllers/anomaliesController");

router.post("/", anomaliesController.create);
router.get("/", anomaliesController.getAll);
router.get("/:id", anomaliesController.getOne);
router.put("/:id", anomaliesController.update);
router.delete("/:id", anomaliesController.delete);

module.exports = router;

