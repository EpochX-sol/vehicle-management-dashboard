import React from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  CheckCircle2, 
  XCircle, 
  WrenchIcon, 
  PlayCircle 
} from 'lucide-react';

const statusConfig = {
  'Active': {
    icon: CheckCircle2,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200'
  },
  'Inactive': {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200'
  },
  'Maintenance': {
    icon: WrenchIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200'
  },
  'In Use': {
    icon: PlayCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200'
  }
};

const VehicleGauge = ({ vehicles }) => {
  const statusCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
    return acc;
  }, {});

  const totalVehicles = vehicles.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {Object.entries(statusConfig).map(([status, config]) => {
        const count = statusCounts[status] || 0;
        const percentage = totalVehicles ? Math.round((count / totalVehicles) * 100) : 0;
        const Icon = config.icon;

        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor} relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Icon className={`${config.color} mr-2`} size={20} />
                <h3 className="text-sm font-semibold text-gray-800">{status}</h3>
              </div>
              <div className="flex items-center">
                <Car className="text-gray-400 mr-1" size={16} />
                <span className="text-xl font-bold text-gray-800">{count}</span>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    {percentage}% of total
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${config.color.replace('text', 'bg')}`}
                />
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Icon size={80} className={config.color} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default VehicleGauge;