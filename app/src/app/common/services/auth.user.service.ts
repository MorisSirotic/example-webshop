import { IRegistrationData } from "../../ui-user/features/authentication/authenticationSlice";
import http from "./helpers/http";

export interface IUserLoginData {
  email: string;
  password: string;
}
export interface IUserRegistrationData {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  postalCode: string;
  email: string;
  password: string;
}
export const UserAuthService = {
  login,
  logout,
  register,
  get,
};
const path: String = "/api/auth";
const API_URL = "http://localhost:8080" + path;

async function login(data: IUserLoginData) {
  return http.post(`${path}/signin`, data);
}

async function register(user: IRegistrationData) {
  return http.post(`${path}/signup`, user);
}
function logout() {
  localStorage.removeItem("user");
  window.location.reload();
}

async function get() {
  return http.get(`${path}/customer`);
}
