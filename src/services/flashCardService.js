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

 const getAllCards = async (page = 1, limit = 10) => {
  const url = `${baseUrl}?_page=${page}&_limit=${limit}`;
  console.log(`Requesting: ${url}`); 
  try {
    const response = await axios.get(url);
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

const updateCardsOrder = async (cards) => {
  try {
    
    const cardIds = cards.map(card => card.id);

    
    const response = await axios.put(`${baseUrl}/order`, { order: cardIds });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
    throw new Error('Failed to update the order of the flashcards. Please try again.');

  }
};

export {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  updateCardsOrder
};