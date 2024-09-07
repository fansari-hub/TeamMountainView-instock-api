const knex = require("knex")(require("../knexfile"));

// ************** REMOVE INVENTORY ************
const removeInventory = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories").where({ id: req.params.id }).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `Inventory with ID ${req.params.id} not found or remove operation was not succesfull` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${error}`,
    });
  }
};

// ************** ADD INVENTORY ************
const addInventory = async (req, res) => {
  if (!req.body.warehouse_id || !req.body.item_name || !req.body.description || !req.body.category || req.body.quantity===undefined) {
    return res.status(400).json({
      message: "Missing one of the the following fields: warehouse_id, item_name, description, category, quantity",
      data_received: req.body,
    });
  }

  console.log(typeof req.body.quantity);
  if (typeof req.body.quantity !== "number") {
    return res.status(400).json({
      message: "Quantity must be a number",
    });
  }

  const inventoryItem = {
    warehouse_id: req.body.warehouse_id,
    item_name: req.body.item_name,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity,
    status: "Out of Stock",
  };

  if (inventoryItem.quantity > 0) {
    inventoryItem.status = "In Stock";
  }

  try {
    const result = await knex("inventories").insert(inventoryItem);
    const newInventoryId = result[0];
    const createdInventory = await knex("inventories").where({ id: newInventoryId });
    res.status(201).json(createdInventory[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory item: ${error}`,
    });
  }
};

// ************** EXPORTS************
module.exports = {
  removeInventory,
  addInventory,
};
