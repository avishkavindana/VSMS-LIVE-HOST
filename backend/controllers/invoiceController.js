const Invoice = require(
  "../models/Invoice"
);

const Appointment = require(
  "../models/Appointment"
);

// Generate Invoice
const generateInvoice =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findById(
          req.body.appointment
        );

      if (!appointment) {
        return res
          .status(404)
          .json({
            message:
              "Appointment not found",
          });
      }

      const invoice =
        await Invoice.create({
          appointment:
            appointment._id,
          customer:
            appointment.customer,
          amount:
            req.body.amount,
        });

      res.status(201).json(
        invoice
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Admin
const getAllInvoices =
  async (req, res) => {
    try {
      const invoices =
        await Invoice.find()
          .populate(
            "customer",
            "name email"
          )
          .populate(
            "appointment"
          );

      res.json(invoices);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// Customer
const getMyInvoices =
  async (req, res) => {
    try {
      const invoices =
        await Invoice.find({
          customer:
            req.user._id,
        }).populate(
          "appointment"
        );

      res.json(invoices);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  generateInvoice,
  getAllInvoices,
  getMyInvoices,
};