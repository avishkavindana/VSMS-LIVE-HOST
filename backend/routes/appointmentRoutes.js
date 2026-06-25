const express = require(
  "express"
);
const router =
  express.Router();

const {
  bookAppointment,
  getAppointments,
  updateAppointment,
  cancelAppointment,
} = require(
  "../controllers/appointmentController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router
  .route("/")
  .post(
    protect,
    bookAppointment
  )
  .get(
    protect,
    getAppointments
  );

router
  .route("/:id")
  .put(
    protect,
    updateAppointment
  )
  .delete(
    protect,
    cancelAppointment
  );

module.exports = router;