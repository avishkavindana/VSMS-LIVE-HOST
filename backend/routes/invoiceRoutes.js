const express = require(
  "express"
);

const router =
  express.Router();

const {
  generateInvoice,
  getAllInvoices,
  getMyInvoices,
} = require(
  "../controllers/invoiceController"
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

router.post(
  "/",
  protect,
  admin,
  generateInvoice
);

router.get(
  "/admin",
  protect,
  admin,
  getAllInvoices
);

router.get(
  "/my",
  protect,
  getMyInvoices
);

module.exports = router;