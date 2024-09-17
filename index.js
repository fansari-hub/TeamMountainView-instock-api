const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT;

const warehouseRoutes = require("./routes/warehouse-routes.js");
const inventoryRoutes = require("./routes/inventory-routes.js");
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
