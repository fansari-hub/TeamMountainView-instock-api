const router = require("express").Router();

router.get("/", (_req, res) => {
    res.send('You have reached /warehouses GET LIST');
  });

  router.post("/", (_req, res) => {
    res.send('You have reached /warehouses POST');
  });

  router.get("/:id", (_req, res) => {
    res.send('You have reached /warehouses ID GET');
  });

  router.delete("/:id", (_req, res) => {
    res.send('You have reached /warehouses ID DELETE');
  });

  router.patch("/:id", (_req, res) => {
    res.send('You have reached /warehouses ID PATCH');
  });


module.exports = router;