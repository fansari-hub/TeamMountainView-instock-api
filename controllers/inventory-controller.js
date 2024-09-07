const knex = require("knex")(require("../knexfile"));
// ************** GET INVENTORY LIST ************
const inventoryList = async (req, res) => {
  try {
    const inventoryData = await knex("inventories")
      .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
      .select(
        'inventories.id', 
        'warehouses.warehouse_name', 
        'inventories.item_name', 
        'inventories.description', 
        'inventories.category', 
        'inventories.status', 
        'inventories.quantity');
    console.log(inventoryData);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      message: `Unable to obtain inventory list: ${error}`,
    });
  }
};
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
  //Check for missing fields
  if (!req.body.warehouse_id || !req.body.item_name || !req.body.description || !req.body.category || req.body.quantity === undefined) {
    return res.status(400).json({
      message: "Missing one of the the following fields: warehouse_id, item_name, description, category, quantity",
      data_received: req.body,
    });
  }

  //check if warehouse exists
  try {
    const warehouseDataFound = await knex("warehouses").where({ id: req.body.warehouse_id });

    if (warehouseDataFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.body.warehouse_id} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for ID ${req.body.warehouse_id}`,
    });
  }

  //Ensure quantity is really a number
  if (typeof req.body.quantity !== "number") {
    return res.status(400).json({
      message: "Quantity must be a number",
    });
  }

  //Assemble data
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

  //update database
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

// ************** PUT INVENTORY ************
const updateInventory = async (req, res) => {
  //check if iventory exists
  try {
    const iventoryItemFound = await knex("inventories").where({ id: req.params.id });

    if (iventoryItemFound.length === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to access inventory data ${req.params.id}`,
    });
  }

  //check for missing fields
  if (!req.body.warehouse_id || !req.body.item_name || !req.body.description || !req.body.category || req.body.quantity === undefined) {
    return res.status(400).json({
      message: "Missing one of the the following fields: warehouse_id, item_name, description, category, quantity",
      data_received: req.body,
    });
  }

  //check if warehouse exists
  try {
    const warehouseDataFound = await knex("warehouses").where({ id: req.body.warehouse_id });

    if (warehouseDataFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.body.warehouse_id} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for ID ${req.body.warehouse_id}`,
    });
  }

  //Ensure quantity is really a number
  if (typeof req.body.quantity !== "number") {
    return res.status(400).json({
      message: "Quantity must be a number",
    });
  }

  //assemble object
  const inventoryItem = {
    warehouse_id: req.body.warehouse_id,
    item_name: req.body.item_name,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity,
    updated_at: new Date().toISOString().slice(0, 19).replace("T", " "), //convert JS DateTime to MySql DateTime
    status: "Out of Stock",
  };

  if (inventoryItem.quantity > 0) {
    inventoryItem.status = "In Stock";
  }

  //update database
  try {
    const _result = await knex("inventories").update(inventoryItem).where({ id: req.params.id });
    const updatedInventory = await knex("inventories").where({ id: req.params.id });
    res.status(200).json(updatedInventory[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory item: ${error}`,
    });
  }
};

// ************** EXPORTS************
module.exports = {
  inventoryList,
  removeInventory,
  addInventory,
  updateInventory,
};
