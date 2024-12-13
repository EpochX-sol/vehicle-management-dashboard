// frontend/src/components/VehicleTable.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Vehicle Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Last Updated</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <AnimatePresence mode="popLayout">
              <tbody>
                {filteredVehicles.map(vehicle => (
                  <motion.tr
                    key={vehicle._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="border-t border-gray-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Car className="text-gray-400 mr-3" size={20} />
                        <span className="text-gray-900">{vehicle.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[vehicle.status]}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-500">
                        <Clock className="mr-2" size={16} />
                        {new Date(vehicle.lastUpdated).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditClick(vehicle)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        >
                          <Edit size={20} />
                        </motion.button>
                        {onDelete && (
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDelete(vehicle._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </motion.div>
 
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