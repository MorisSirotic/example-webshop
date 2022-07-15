import { authHeader } from "./helpers/authHeader";
import http from "./helpers/http";

export const CheckoutService = {
  getCheckoutInformation,
  placeOrder,
};
const path: String = "/";

async function getCheckoutInformation() {
  const requestOptions = {
    headers: authHeader(),
  };

  const reponse = http.get(`${path}checkout`, requestOptions);

  return reponse;
}

async function placeOrder(paymentMethod: string) {
  
  const response = await http.post(
    `${path}place_order?paymentMethod=${paymentMethod}`
  );
  return response;
}
