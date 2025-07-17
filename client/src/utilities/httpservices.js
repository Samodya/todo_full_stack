import axios from 'axios';

const apiService = {

  
 // Create (POST)
 createData: async (collection, data, token, role) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/${collection}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
        
      });
      return response.data;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
 },

 // Read (GET)
 getData: async (collection,token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${collection}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
 },

 getDataById: async (collection,id,token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${collection}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
 },

 // Update (PUT)
 updateData: async (collection,id, data, token, role) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${collection}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
 },

 // Delete (DELETE)
 deleteData: async (collection, id, token) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${collection}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
 },
};

export default apiService;
