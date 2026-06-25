const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Appointment = require(
  "../models/Appointment"
);

// Dashboard Statistics
const getDashboard = async (
  req,
  res
) => {
  try {
    const customers =
      await User.countDocuments({
        role: "customer",
      });

    const vehicles =
      await Vehicle.countDocuments();

    const appointments =
      await Appointment.countDocuments();

    const pending =
      await Appointment.countDocuments({
        status: "Pending",
      });

    res.json({
      customers,
      vehicles,
      appointments,
      pending,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Appointments
const getAllAppointments =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find()
          .populate(
            "customer",
            "name email"
          )
          .populate(
            "vehicle",
            "vehicleNo"
          );

      res.json(appointments);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Update Appointment Status
const updateStatus =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findById(
          req.params.id
        );

      if (!appointment) {
        return res
          .status(404)
          .json({
            message:
              "Appointment not found",
          });
      }

      appointment.status =
        req.body.status;

      await appointment.save();

      res.json({
        message:
          "Status Updated",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getDashboard,
  getAllAppointments,
  updateStatus,
};