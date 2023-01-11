import { AxiosResponse } from "axios";
import { authHeader } from "./helpers/authHeader";
import http from "./helpers/http";

export const AddressService = {
  getCart,
  updateQuantity,
  delete: _delete,
};
const path: String = "/address";
const API_URL = "http://localhost:8080" + path;


async function getCart() {
  const requestOptions = {
    headers: authHeader(),
  };

  const reponse = http.get(`${API_URL}/`, requestOptions);

  return reponse;
}

async function updateQuantity(productId: number, quanity: number) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
  };

  const response = await fetch(
    `${API_URL}/update/${productId}/${quanity}`,
    requestOptions
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id: string) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(`${API_URL}/remove/${id}`, requestOptions);
}

function handleResponse(response: Promise<AxiosResponse>) {
  response.then((response) => {
    const data = response.data;
    if (response.status === 401) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      return data;
    }
  });
}
