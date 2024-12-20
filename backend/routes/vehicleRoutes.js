const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

router
  .route('/')
  .get(vehicleController.getAllVehicles)
  .post(vehicleController.addVehicle);

router
  .route('/:id')
  .get(vehicleController.getVehicle)
  .delete(vehicleController.deleteVehicle);

router
  .route('/:id/status')
  .patch(vehicleController.updateVehicleStatus);

module.exports = router;