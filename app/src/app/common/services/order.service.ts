import { authHeader } from "./helpers/authHeader";
import http from "./helpers/http";

export const OrderService = {
  getByPage,
  getByCategory,
};
const path: String = "/orders";
const API_URL = "http://localhost:8080" + path;

async function getByCategory(categoryId: Number) {
  return http.post(API_URL + `/${categoryId}`);
}

async function getByPage(pageNum: number, sortField: string, sortDir: string) {
  const requestOptions = {
    headers: authHeader(),
  };

  const reponse = http.get(
    `${path}/page/${pageNum}?sortField=${sortField}&sortDir=${sortDir}`,
    requestOptions
  );

  return reponse;
}

