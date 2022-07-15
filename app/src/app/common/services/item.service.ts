import { authHeader } from "./helpers/authHeader";
import http from "./helpers/http";

export const ItemService = {
  getAll,
  getById,
  getByCategory,
};
const path: String = "/api/items";
const API_URL = "http://localhost:8080" + path;

async function getByCategory(categoryId: Number) {
  return http.post(`/${path}`);
}

async function getAll() {
  http.get(`${API_URL}/items/all`);
  const response = await fetch(`${API_URL}/users`);
  return response;
}

async function getById(id: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(`${API_URL}/users/${id}`, requestOptions);
  return response;
}
