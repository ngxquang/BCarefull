import axios from 'axios';

const API_KEY = '80e30396d10349d4b899baa278488ad4';
const BASE_URL = 'https://newsapi.org/v2';

const getArticles = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        apiKey: API_KEY,
      },
    });
    console.log("NEWSSSS >>>>> ", response.data.articles)
    return response.data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getArticles;
