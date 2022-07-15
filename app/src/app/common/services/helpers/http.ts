import axios, { AxiosError } from "axios";
import { logout } from "../../../ui-user/features/authentication/authenticationSlice";
import { UserAuthService } from "../auth.user.service";
import { userIsLoggedIn } from "./authHeader";
function axiosHeader(): string {
  // return authorization header with jwt token
  const extract = JSON.parse(localStorage.getItem("user")!);

  if (extract) {
    const { user } = extract;

    if (user && user.accessToken) {
      
      return `Bearer ${user.accessToken}`;
    } else {
      return "";
    }
  } else return "";
}
const instance = axios.create({
  baseURL: `${window.origin.replace(":3000", ":8080")}/`,
  headers: {
    "Content-type": "application/json",
    Authorization: axiosHeader(),
    "Access-Control-Request-Private-Network": true,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response!.status === 401 && userIsLoggedIn()) {
      UserAuthService.logout();
    } else {
      return Promise.reject(error);
    }
  }
);
export default instance;
