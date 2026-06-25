const Appointment = require(
  "../models/Appointment"
);

// Book Appointment
const bookAppointment = async (
  req,
  res
) => {
  try {
    const appointment =
      await Appointment.create({
        customer: req.user._id,
        vehicle: req.body.vehicle,
        serviceType:
          req.body.serviceType,
        appointmentDate:
          req.body.appointmentDate,
      });

    res.status(201).json(
      appointment
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Appointments
const getAppointments =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find({
          customer: req.user._id,
        }).populate("vehicle");

      res.json(appointments);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Reschedule Appointment
const updateAppointment =
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

      appointment.appointmentDate =
        req.body.appointmentDate;

      const updated =
        await appointment.save();

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// Cancel Appointment
const cancelAppointment =
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
        "Cancelled";

      await appointment.save();

      res.json({
        message:
          "Appointment Cancelled",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  bookAppointment,
  getAppointments,
  updateAppointment,
  cancelAppointment,
};