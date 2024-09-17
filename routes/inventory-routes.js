const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");
const SERVER_LOGGING = true;

// *** Middleware to automatically log server requests ***
router.use((req, _res, next) => {
  next();
  if (SERVER_LOGGING) {
    console.log(`Requested METHOD: ${req.method} | ENDPOINT: ${req.originalUrl} | CODE: ${req.res.statusCode}`);
  }
});

router
  .route("/")
  .get((req, res) => {
    inventoryController.inventoryList(req, res);
  })
  .post((req, res) => {
    inventoryController.addInventory(req, res);
  });

router
  .route("/:id")
  .get((req, res) => {
    inventoryController.getSingleItem(req, res);
  })
  .delete((req, res) => {
    inventoryController.removeInventory(req, res);
  })
  .put((req, res) => {
    inventoryController.updateInventory(req, res);
  });

// ************** EXPORTS************
module.exports = router;
