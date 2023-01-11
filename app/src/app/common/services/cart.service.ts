import http from "./helpers/http";

export const CartService = {
  getCart,
  addItemToCart,
  delete: _delete,
};

const path: String = "/cart";

async function getCart() {
  const reponse = http.get(`${path}`);
  return reponse;
}

async function addItemToCart(productId: number, quantity: number) {
  const response = http.post(`${path}/add/${productId}/${quantity}`);
  return response;
}

async function _delete(id: number) {

  const response = http.delete(`${path}/remove/${id}`)
  return response;
}
