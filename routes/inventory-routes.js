const router = require("express").Router();

router.get("/", (_req, res) => {
    res.send('You have reached /inventory GET LIST');
  });

  router.post("/", (_req, res) => {
    res.send('You have reached /inventory  POST');
  });

  router.get("/:id", (_req, res) => {
    res.send('You have reached /inventory ID GET');
  });

  router.delete("/:id", (_req, res) => {
    res.send('You have reached /inventory ID DELETE');
  });

  router.patch("/:id", (_req, res) => {
    res.send('You have reached /inventory ID PATCH');
  });


module.exports = router;