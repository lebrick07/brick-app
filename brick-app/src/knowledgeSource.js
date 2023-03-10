import axios from 'axios';

const API_URL = 'https://chat.openai.com/chat';

const generateResponse = async (input) => {
  const response = await axios.post(API_URL, { input });
  return response.data.output;
};

export default generateResponse;