const knex = require("knex")(require("../knexfile"));



// ************** GET WAREHOUSE BY ID ************
const getSingleWarehouse = async (req, res) => {
  try {
    const warehouseDataFound = await knex("warehouses").where({ id: req.params.id });

    if (warehouseDataFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found.`,
      });
    }

    const warehouseData = warehouseDataFound[0];
    res.json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for ID ${req.params.id}`,
    });
  }
};

// ************** REMOVE WAREHOUSE ************
const removeWarehouse = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses").where({ id: req.params.id }).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `Warehouse with ID ${req.params.id} not found or remove operation was not succesfull` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
};


// ************** EXPORTS************
module.exports = {
  getSingleWarehouse,
  removeWarehouse,
};
