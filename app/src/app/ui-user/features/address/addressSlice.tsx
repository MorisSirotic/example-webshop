import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authHeader } from "../../../common/services/helpers/authHeader";
import http from "../../../common/services/helpers/http";
import { AppThunk, RootState } from "../../../common/store";

export interface IAddressData {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  password: string;
  country: {
    id?: number;
    code?: string;
    name: string;
  };
  fullName?: string;
  defaultForShipping: boolean | false;
}

interface AddressState {
  addresses: Array<IAddressData>;
  defaultAddress: IAddressData | null;
  status: "idle" | "loading" | "success" | "failed";
}
const initialState: AddressState = {
  addresses: [],
  status: "idle",
  defaultAddress: null,
};

export const addressAsync = createAsyncThunk(
  "address/fetchAddress",
  async () => {
    const requestOptions = {
      headers: authHeader(),
    };

    const response = await http.get(
      "http://localhost:8080/address/",
      requestOptions
    );

    return response.data;
  }
);

export const addressSlice = createSlice({
  name: "addresses",
  initialState: initialState,
  reducers: {
    addressSaveDefault: (state, action: PayloadAction<IAddressData>) => {
      state.defaultAddress = action.payload;
    },

    addressSave: (state, action: PayloadAction<AddressState>) => {
      state.addresses = action.payload.addresses;
    },
    addressSaveOne: (state, action: PayloadAction<IAddressData>) => {
      state.addresses.push(action.payload);
    },
    addressUpdateOne: (state, action: PayloadAction<IAddressData>) => {
      state.addresses = state.addresses.filter(
        (i) => i.id !== action.payload.id
      );
      state.addresses.push(action.payload);
    },
    addressRemove: (state, action: PayloadAction<Number>) => {
      state.addresses = state.addresses.filter((i) => i.id !== action.payload);
    },
    addressClear: (state) => {
      state.addresses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addressAsync.fulfilled, (state, action) => {
        state.addresses.map((address) => {
          if (address.defaultForShipping) {
            state.defaultAddress = address;
          }
        });
        state.addresses = action.payload;
        state.status = "success";
      })
      .addCase(addressAsync.rejected, (state) => {
        state.addresses = [];
        state.status = "failed";
      });
  },
});

export const addressAddNew =
  (address: IAddressData): AppThunk =>
  async (dispatch) => {
    const requestOptions = {
      headers: authHeader(),
    };

    await http
      .post(`http://localhost:8080/address/new/`, address, requestOptions)
      .then(
        (res) => {
          dispatch(addressSaveOne(address));
        },
        (err) => {}
      );
  };

export const addressAddFavorite =
  (address: IAddressData): AppThunk =>
  async (dispatch) => {
    const requestOptions = {
      headers: authHeader(),
    };
    await http
      .post(
        `http://localhost:8080/address/default/${address.id}`,
        address,
        requestOptions
      )
      .then(
        (res) => {
          dispatch(addressSaveDefault(address));
        },
        (err) => {}
      );
  };

export const addressEdit =
  (id: number, address: IAddressData): AppThunk =>
  async (dispatch) => {
    const requestOptions = {
      headers: authHeader(),
    };
    await http
      .put(
        `http://localhost:8080/address/update/${id}`,
        address,
        requestOptions
      )
      .then(
        (res) => {
          dispatch(addressUpdateOne(address));
        },
        (err) => {}
      );
  };

export const addressDelete =
  (id: number): AppThunk =>
  async (dispatch) => {
    const requestOptions = {
      headers: authHeader(),
    };
    await http
      .delete(`http://localhost:8080/address/delete/${id}`, requestOptions)
      .then(
        (res) => {
          dispatch(addressRemove(id));
        },
        (err) => {}
      );
  };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectItems = (state: RootState) => state.items;
export const selectEditableItems = (state: RootState) => [...state.items.items];

export const {
  addressSave,
  addressClear,
  addressRemove,
  addressSaveOne,
  addressUpdateOne,
  addressSaveDefault,
} = addressSlice.actions;
export default addressSlice.reducer;
