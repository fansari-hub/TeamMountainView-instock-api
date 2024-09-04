const router = require("express").Router();

router.get("/", (_eq, res) => {
  res.send("You have reached /warehouses GET LIST");
});

router.post("/", (req, res) => {
  res.send("You have reached /warehouses POST");
});

router.get("/:id", (req, res) => {
  res.send("You have reached /warehouses ID GET");
});

router.delete("/:id", (req, res) => {
  res.send("You have reached /warehouses ID DELETE");
});

router.patch("/:id", (req, res) => {
  res.send("You have reached /warehouses ID PATCH");
});

module.exports = router;
