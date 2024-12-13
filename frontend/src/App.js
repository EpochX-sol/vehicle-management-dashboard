import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RefreshCw } from 'lucide-react';
import VehicleTable from './components/VehicleTable';
import VehicleGauge from './components/VehicleGauge'; 
import AddVehicleModal from './components/AddVehicleModal';
import { useVehicles } from './hooks/useVehicles';
import './styles/global.css';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { vehicles, loading, error, refreshVehicles, addVehicle, updateStatus } = useVehicles();

  const handleAddVehicle = async (vehicleData) => {
    const success = await addVehicle(vehicleData);
    if (success) {
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
  
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mini project</h1>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => refreshVehicles()}
                className="btn btn-secondary flex items-center text-sm"
              >
                <RefreshCw className="mr-1.5 h-4 w-4" />
                Refresh
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddModalOpen(true)}
                className="btn btn-primary flex items-center text-sm"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add Vehicle
              </motion.button>
            </div>
          </motion.div>
        </div>
 
        {!loading && !error && <VehicleGauge vehicles={vehicles} />}
 
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
 
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </motion.div>
          ) : (
            <VehicleTable
              vehicles={vehicles}
              onStatusUpdate={updateStatus}
            />
          )}
        </AnimatePresence>
 
        <AddVehicleModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddVehicle}
        />
      </div>
    </div>
  );
}

export default App;