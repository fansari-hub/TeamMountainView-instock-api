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

router.get("/warehouse/:id", (req, res) => {
  res.send("You have reached /inventory GET LIST by Warehouse ID");
});

router.delete("/:id", (req, res) => {
  res.send("You have reached /inventory ID DELETE");
});

router.patch("/:id", (req, res) => {
  res.send("You have reached /inventory ID PATCH");
});

module.exports = router;
