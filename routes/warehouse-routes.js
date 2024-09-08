const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");
const SERVER_LOGGING = true;

// *** Middleware to automatically log server requests ***
router.use((req, _res, next) => {
  next();
  if (SERVER_LOGGING) {
    console.log(
      `Requested METHOD: ${req.method} | ENDPOINT: ${req.originalUrl} | CODE: ${req.res.statusCode}`
    );
  }
});

router
  .route("/")
  .get((req, res) => {
    warehouseController.warehouseList(req, res);
  })
  .post((req, res) => {
    // Placeholder: Remove line below when controller is ready to be used.
    res.send("You have reached /warehouses POST");
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
  // Placeholder: Remove line below when controller is ready to be used.
  res.send("You have reached /warehouses ID GET inventory LIST");
});

// router.get("/", (req, res) => {
//   warehouseController.warehouseList(req, res);
// });

// router.post("/", (req, res) => {
//    //Placeholder: Remove line below when controller is ready to be used.
//   res.send("You have reached /warehouses POST");
// });

// router.get("/:id", (req, res) => {
//   warehouseController.getSingleWarehouse(req, res);
// });

// router.get("/:id/inventories", (req, res) => {
//    //Placeholder: Remove line below when controller is ready to be used.
//   res.send("You have reached /warehouses ID GET inventory LIST");
// });

// router.delete("/:id", (req, res) => {
//   warehouseController.removeWarehouse(req, res);
// });

// router.put("/:id", (req, res) => {
//    //Placeholder: Remove line below when controller is ready to be used.
//   res.send("You have reached /warehouses ID PUT");
// });

// ************** EXPORTS************
module.exports = router;
