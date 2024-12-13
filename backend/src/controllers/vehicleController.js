const Vehicle = require('../models/Vehicle');
const {asyncHandler,AppError} = require('../middlewares/errorHandler'); 
 
exports.getAllVehicles = asyncHandler(async (req, res, next) => { 
  const vehicles = await Vehicle.find()
    .sort('-lastUpdated')
    .select('-__v');

  res.status(200).json({
    status: 'success',
    results: vehicles.length,
    data: { 
      vehicles: vehicles.map(vehicle => vehicle.formatDetails())
    }
  });
});
 
exports.addVehicle = asyncHandler(async (req, res, next) => {
  const { 
    name, 
    status, 
    description
  } = req.body;
 
  if (!name) {
    return next(new AppError('Vehicle name is required', 400));
  }

  const newVehicle = await Vehicle.create({
    name,
    status: status || 'Active',
    description
  });

  res.status(201).json({
    status: 'success',
    data: { 
      vehicle: newVehicle.formatDetails() 
    }
  });
});
 
exports.updateVehicleStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
 
  if (!['Active', 'Inactive', 'Maintenance', 'In Use'].includes(status)) {
    return next(new AppError('Invalid vehicle status', 400));
  }

  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id, 
    { 
      status,
      lastUpdated: new Date()
    },
    { 
      new: true, 
      runValidators: true 
    }
  );

  if (!vehicle) {
    return next(new AppError('No vehicle found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { 
      vehicle: vehicle.formatDetails() 
    }
  });
});
 
exports.deleteVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

  if (!vehicle) {
    return next(new AppError('No vehicle found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
 
exports.getVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    return next(new AppError('No vehicle found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { 
      vehicle: vehicle.formatDetails() 
    }
  });
});