const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vehicle name is required'],
    trim: true,
    maxlength: [50, 'Vehicle name cannot exceed 50 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['Active', 'Inactive', 'Maintenance', 'In Use'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Active'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

vehicleSchema.methods.formatDetails = function() {
  return {
    id: this._id,
    name: this.name,
    status: this.status,
    description: this.description,
    lastUpdated: this.lastUpdated
  };
};

module.exports = mongoose.model('Vehicle', vehicleSchema);