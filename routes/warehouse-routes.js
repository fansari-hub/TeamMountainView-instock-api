const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");
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
    warehouseController.warehouseList(req, res);
  })
  .post((req, res) => {
    warehouseController.addWarehouse(req, res);
  });

router
  .route("/:id")
  .get((req, res) => {
    warehouseController.getSingleWarehouse(req, res);
  })
  .delete((req, res) => {
    warehouseController.removeWarehouse(req, res);
  })
  .put((req, res) => {
    warehouseController.updateWarehouse(req, res);
  });

router.get("/:id/inventories", (req, res) => {
  warehouseController.getInventoryForWarehouse(req, res);
});

// ************** EXPORTS************
module.exports = router;
