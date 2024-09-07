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

router.get("/", (req, res) => {
  inventoryController.inventoryList(req, res);
});

router.post("/", (req, res) => {
  inventoryController.addInventory(req, res);
});

router.get("/:id", (req, res) => {
   //Placeholder: Remove line below when controller is ready to be used.
  res.send("You have reached /inventory ID GET");
});

router.delete("/:id", (req, res) => {
  inventoryController.removeInventory(req, res);
});

router.put("/:id", (req, res) => {
  inventoryController.updateInventory(req, res);
});

// ************** EXPORTS************
module.exports = router;
