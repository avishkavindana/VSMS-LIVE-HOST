const Service = require(
  "../models/Service"
);

const addService =
  async (req, res) => {
    try {
      const service =
        await Service.create({
          serviceName:
            req.body.serviceName,
          description:
            req.body.description,
          price:
            req.body.price,
        });

      res.status(201).json(
        service
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getServices =
  async (req, res) => {
    try {
      const services =
        await Service.find();

      res.json(services);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const deleteService =
  async (req, res) => {
    try {
      const service =
        await Service.findById(
          req.params.id
        );

      if (!service) {
        return res
          .status(404)
          .json({
            message:
              "Service not found",
          });
      }

      await service.deleteOne();

      res.json({
        message:
          "Service Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  addService,
  getServices,
  deleteService,
};