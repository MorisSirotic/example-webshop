import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../user/userSlice";
import { Alert_Type } from "./types/AlertTypes";

interface IAlert {
  type?: Alert_Type;
  message?: string;
  user?: IUser;
  from?: string;
}

const initialState: IAlert = {};
export const alertSlice = createSlice({
  name: "alerts",
  initialState: initialState,
  reducers: {
    alertSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.type = Alert_Type.SUCCESS;
      state.message = action.payload.message;
    },
    alertClear: (state) => {
      state.message = "";
      state.type = Alert_Type.CLEAR;
    },
    alertCustom: (state, action: PayloadAction<IAlert>) => {
      const newAlert = { ...action.payload };

      state.from = newAlert.from;
      state.message = newAlert.message;
      state.type = Alert_Type.CUSTOM;
      state.user = newAlert.user;
    },
    alertError: (state, action: PayloadAction<{ message: string }>) => {
      state.type = Alert_Type.ERROR;
      state.message = action.payload.message;
    },
  },
});

export const { alertSuccess, alertClear, alertError, alertCustom } =
  alertSlice.actions;
export default alertSlice.reducer;
