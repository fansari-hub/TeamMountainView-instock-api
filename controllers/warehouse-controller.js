const knex = require("knex")(require("../knexfile"));

// ************** GET WAREHOUSE LIST ************
const warehouseList = async (req, res) => {
  try {
    const warehouseData = await knex("warehouses");
    res.json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to obtain warehouse list: ${error}`,
    });
  }
};

// ************** GET WAREHOUSE BY ID ************
const getSingleWarehouse = async (req, res) => {
  try {
    const warehouseDataFound = await knex("warehouses").where({
      id: req.params.id,
    });

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

// ************** EDIT/PUT WAREHOUSE BY ID ************
const updateWarehouse = async (req, res) => {
  //check if warehouse exists
  try {
    const warehouseFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to access inventory data ${req.params.id}`,
    });
  }

  //check for missing fields
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res.status(400).json({
      message: "Missing one or more required fields",
      data_received: req.body,
    });
  }

  //validate phone number has exactly 11 digits

  if (req.body.contact_phone.replace(/\D/g, "").length !== 11) {
    return res.status(400).json({
      message:
        "Invalid phone number. It must contain 11 digits including area code",
    });
  }

  //validate email ends with "@instock.com"
  if (!req.body.contact_email.endsWith("@instock.com")) {
    return res.status(400).json({
      message: "Invalid email. It must have the domain @instock.com",
    });
  }

  //update database
  try {
    const _result = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    const updatedWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });
    res.status(200).json(updatedWarehouse[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory item: ${error}`,
    });
  }
};

// ************** REMOVE WAREHOUSE ************
const removeWarehouse = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found or remove operation was not succesfull`,
      });
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
  warehouseList,
  getSingleWarehouse,
  removeWarehouse,
  updateWarehouse,
};
