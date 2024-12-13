import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Car, Edit, Trash2, Search
} from 'lucide-react';
import EditVehicleModal from './EditVehicleModal';

const statusColors = {
  'Active': 'bg-green-100 text-green-800 border-green-200',
  'Inactive': 'bg-red-100 text-red-800 border-red-200',
  'Maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'In Use': 'bg-blue-100 text-blue-800 border-blue-200'
};

const VehicleTable = ({ vehicles, onStatusUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (id, editedData) => {
    onStatusUpdate(id, editedData.status);
    setIsEditModalOpen(false);
    setSelectedVehicle(null);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Vehicle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500">Last Updated</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(vehicle => (
                <tr key={vehicle._id} className="border-t border-gray-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Car className="text-gray-400 mr-2" size={16} />
                      <span className="text-sm text-gray-900">{vehicle.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[vehicle.status]}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-4 py-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="mr-1.5" size={14} />
                      {new Date(vehicle.lastUpdated).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-1">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditClick(vehicle)}
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-full"
                      >
                        <Edit size={16} />
                      </motion.button>
                      {onDelete && (
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onDelete(vehicle._id)}
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded-full"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditVehicleModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedVehicle(null);
        }}
        onEdit={handleEditSubmit}
        vehicle={selectedVehicle}
      />
    </div>
  );
};

export default VehicleTable;