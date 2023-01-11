import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UserAuthService } from "../../../common/services/auth.user.service";
import { AppThunk } from "../../../common/store";
import { alertCustom } from "../alert/alertSlice";
import { IUser, userAdd } from "../user/userSlice";

export enum AuthType {
  LOGIN,
  REGISTRATION,
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  country: {
    id?: number;
    code?: string;
    name: string;
  };
  defaultForShipping: boolean | false;
}

export interface RegistrationRequest {
  type: AuthType.REGISTRATION;
  data: IRegistrationData;
}

export interface LoginRequest {
  type: AuthType.LOGIN;
  data: ILoginData;
}

interface UserLoggedIn {
  user: IUser;
  isLoggedIn: boolean;
}
interface AuthenticationState {
  user?: UserLoggedIn;
}

const toParse = JSON.stringify(localStorage.getItem("user") || {});
const user: IUser = JSON.parse(toParse);

const initialState: AuthenticationState = {
  user: user ? { user, isLoggedIn: true } : undefined,
};
export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = { isLoggedIn: true, user: action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    register: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: action.payload,
          redirect: true,
          isLoggedIn: false,
        })
      );
    },
  },
});
export const { login, register } = authenticationSlice.actions;

export const logout = (): AppThunk => () => {
  UserAuthService.logout();
};
export const authentication =
  (request: LoginRequest | RegistrationRequest): AppThunk =>
  (dispatch, getState) => {
    if (request.type === AuthType.LOGIN) {
      const { email, password } = request.data;
      if (email === "" || password === "") {
        dispatch(
          alertCustom({
            message:
              "Some fields are empty. Please check carefully and try again.",
          })
        );
      } else {
        UserAuthService.login(request.data).then(
          (res) => {
            dispatch(login(res.data));
            dispatch(userAdd(res.data));

            //dispatch(alertSuccess({ message: "Successful Login" }));
          },
          (err: AxiosError) => {
            const errorCode = err.response!.status;
            const errMessage = err.response?.data.message;
            if (errorCode === 401) {
              dispatch(
                alertCustom({
                  message: "Email/Password is incorrect. Please try again.",
                })
              );
            } else if (errorCode === 500) {
              dispatch(
                alertCustom({
                  message: "Something went wrong. Please try again later.",
                })
              );
            }
          }
        );
      }
    } else if (request.type === AuthType.REGISTRATION) {
      UserAuthService.register(request.data).then(
        (res) => {
          dispatch(register(res.data));
          dispatch(userAdd(res.data));
          window.location.replace("/login");
        },
        (err: AxiosError) => {
          const errorCode = err.response!.status;
          const generic = err.response?.data.message;
          const errorMessage = err.response?.data;
          if (errorCode === 406) {
            dispatch(
              alertCustom({
                message: "Email is already taken.",
              })
            );
          } else if (errorCode === 500) {
            dispatch(
              alertCustom({
                message: "Something went wrong. Please try again later.",
              })
            );
          } else {
            dispatch(alertCustom({ message: errorMessage }));
          }
        }
      );
    }
  };
export default authenticationSlice.reducer;
