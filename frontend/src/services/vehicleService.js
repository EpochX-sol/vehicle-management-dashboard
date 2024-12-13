const API_URL = process.env.API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchVehicles = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await handleResponse(response);
    return data.data.vehicles;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

export const addVehicle = async (vehicleData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    const data = await handleResponse(response);
    return data.data.vehicle;
  } catch (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }
};

export const updateVehicleStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await handleResponse(response);
    return data.data.vehicle;
  } catch (error) {
    console.error('Error updating vehicle status:', error);
    throw error;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};