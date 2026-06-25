const Vehicle = require("../models/Vehicle");

// Add Vehicle
const addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create({
      customer: req.user._id,
      vehicleNo: req.body.vehicleNo,
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      fuelType: req.body.fuelType,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      customer: req.user._id,
    });

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Vehicle
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(
      req.params.id
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    if (
      vehicle.customer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    vehicle.vehicleNo =
      req.body.vehicleNo ||
      vehicle.vehicleNo;

    vehicle.brand =
      req.body.brand ||
      vehicle.brand;

    vehicle.model =
      req.body.model ||
      vehicle.model;

    vehicle.year =
      req.body.year ||
      vehicle.year;

    vehicle.fuelType =
      req.body.fuelType ||
      vehicle.fuelType;

    const updated =
      await vehicle.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Vehicle
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(
      req.params.id
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    await vehicle.deleteOne();

    res.json({
      message: "Vehicle deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
};