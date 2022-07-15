import { ILoginData } from "../../ui-user/features/authentication/authenticationSlice";
import http from "./helpers/http";

const path: String = "AquaticShopAdmin/users";
const API_URL = "http://localhost:8080/" + path;

async function login(data: ILoginData) {
  

  return http.post(API_URL + "/sig3nin", data);
}

const getAll = async () => {
  const res = await http.get(API_URL);
  
};

export const UserService = {
  //   login,
  //   logout,
  //   register,
  getAll,
  //   getById,
  //   update,
  //   delete: _delete,
};
