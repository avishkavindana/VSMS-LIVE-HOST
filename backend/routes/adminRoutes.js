const express = require(
  "express"
);

const router =
  express.Router();

const {
  getDashboard,
  getAllAppointments,
  updateStatus,
} = require(
  "../controllers/adminController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  admin,
} = require(
  "../middleware/adminMiddleware"
);

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboard
);

router.get(
  "/appointments",
  protect,
  admin,
  getAllAppointments
);

router.put(
  "/appointments/:id",
  protect,
  admin,
  updateStatus
);

module.exports = router;