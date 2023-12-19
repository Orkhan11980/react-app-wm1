import axios from 'axios'



const baseUrl = 'http://localhost:3002/cards';

const getAllCards = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors 
    throw error;
  }
};

const getCardById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createCard = async (newCardData) => {
  try {
    const response = await axios.post(baseUrl, newCardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCard = async (id, updatedCardData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedCardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteCard = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard
  };
