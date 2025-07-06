import api from './axios'

export async function getCategories(){
    try {
    const response = await api.get(`/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}