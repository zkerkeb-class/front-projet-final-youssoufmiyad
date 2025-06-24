import api from "./axios";

export async function getUser(slug) {
  try {
    const response = await api.get(`/users/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id) {
  try {
    const response = await api.get(`/users/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
