const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("You have reached /warehouses GET LIST");
});

router.post("/", (req, res) => {
  res.send("You have reached /warehouses POST");
});

router.get("/:id", (req, res) => {
  res.send("You have reached /warehouses ID GET");
});

router.get("/:id/inventories", (req, res) => {
  res.send("You have reached /warehouses ID GET inventory LIST");
});

router.delete("/:id", (req, res) => {
  res.send("You have reached /warehouses ID DELETE");
});

router.put("/:id", (req, res) => {
  res.send("You have reached /warehouses ID PUT");
});

module.exports = router;
