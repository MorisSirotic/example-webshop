import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthService } from "../../../common/services/auth.user.service";
export interface Name {
  firstname: string;
  lastname: string;
}
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country?: {
    id?: number;
    name: string;
    code?: string;
  };
  email: string;
  fullName: string;
}
export interface USerState {
  user?: IUser;
  status: "idle" | "loading" | "failed" | "success";
}
const initialState: USerState = {
  user: undefined,
  status: "idle",
};

export const userGet = createAsyncThunk("user/fetchUser", async () => {
  const response = await UserAuthService.get();
  userAdd(response.data);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userAdd: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userGet.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";

        //If we want to preserve old values
        // state.users = state.users.concat(...action.payload)
      })
      .addCase(userGet.rejected, (state) => {
        state.user = undefined;
        state.status = "failed";
      });
  },
});
export const { userAdd } = userSlice.actions;
export default userSlice.reducer;
