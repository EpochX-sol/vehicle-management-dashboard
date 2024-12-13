// frontend/src/hooks/useVehicles.js
import { useState, useEffect } from 'react';
import { fetchVehicles, addVehicle, updateVehicleStatus, deleteVehicle } from '../services/vehicleService';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await fetchVehicles();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (vehicleData) => {
    try {
      const newVehicle = await addVehicle(vehicleData);
      setVehicles(prev => [...prev, newVehicle]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedVehicle = await updateVehicleStatus(id, status);
      setVehicles(prev => prev.map(v => v._id === id ? updatedVehicle : v));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return {
    vehicles,
    loading,
    error,
    refreshVehicles: loadVehicles,
    addVehicle: handleAddVehicle,
    updateStatus: handleUpdateStatus,
    deleteVehicle: handleDeleteVehicle
  };
};