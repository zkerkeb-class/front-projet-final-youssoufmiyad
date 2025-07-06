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

export async function getRecipeById(id) {
  try {
    const response = await api.get(`/recipes/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addRecipe(recipeData, token) {
  try {
    const response = await api.post("/recipes", recipeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function modifyRecipe(id, recipeData, token) {
  try {
    const response = await api.put(`/recipes/${id}`, recipeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function associateRecipeWithChef(recipeId, chefId, token) {
  try {
    const response = await api.put(
      `/recipes/${recipeId}/chef/${chefId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}