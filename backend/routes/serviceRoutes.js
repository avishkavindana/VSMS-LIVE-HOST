const express = require(
  "express"
);

const router =
  express.Router();

const {
  addService,
  getServices,
  deleteService,
} = require(
  "../controllers/serviceController"
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

router
  .route("/")
  .post(
    protect,
    admin,
    addService
  )
  .get(getServices);

router
  .route("/:id")
  .delete(
    protect,
    admin,
    deleteService
  );

module.exports = router;