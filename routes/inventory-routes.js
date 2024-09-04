const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("You have reached /inventory GET LIST");
});

router.post("/", (req, res) => {
  res.send("You have reached /inventory  POST");
});

router.get("/:id", (req, res) => {
  res.send("You have reached /inventory ID GET");
});

router.delete("/:id", (req, res) => {
  res.send("You have reached /inventory ID DELETE");
});

router.put("/:id", (req, res) => {
  res.send("You have reached /inventory ID PUT");
});

module.exports = router;
