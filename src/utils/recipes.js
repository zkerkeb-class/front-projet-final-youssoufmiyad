import api from "./axios";

export async function getRecipes(page = 1) {
    try {
    const response = await api.get(`/recipes?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecipe(slug) {
  try {
    const response = await api.get(`/recipes/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}