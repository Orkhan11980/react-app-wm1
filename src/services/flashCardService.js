import axios from 'axios';

const baseUrl = 'http://localhost:3001/cards';

const handleResponse = (response) => {
  
  console.log('Response:', response);
  return response.data;
};

const handleError = (error) => {
  
  console.error('Error:', error);
  throw error;
};

const getAllCards = async () => {
  try {
    const response = await axios.get(baseUrl);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const getCardById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const createCard = async (newCardData) => {
  try {
    const response = await axios.post(baseUrl, newCardData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const updateCard = async (id, updatedCardData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedCardData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

const deleteCard = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard
};