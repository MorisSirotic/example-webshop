import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutService } from "../../../common/services/checkout.service";
import { AppThunk } from "../../../common/store";

export interface ICheckoutData {
  checkoutInfo: {
    productCost: number;
    productTotal: number;
    shippingCostTotal: number;
    paymentTotal: number;
    deliverDays: number;
    codSupported: boolean;
    deliverDate: string;
    paymentTotal4PayPal: string;
  };
  status:
    | "idle"
    | "loading"
    | "success"
    | "failed"
    | "orderPlaced"
    | "successfullyLoadedCheckout";
}
const initialState: ICheckoutData = {
  status: "idle",
  checkoutInfo: {
    productCost: 0,
    productTotal: 0,
    shippingCostTotal: 0,
    paymentTotal: 0,
    deliverDays: 0,
    codSupported: false,
    deliverDate: "",
    paymentTotal4PayPal: "",
  },
};

export const getCheckoutInfo = (): AppThunk => (dispatch) => {
  CheckoutService.getCheckoutInformation().then(
    (res) => {
      dispatch(checkoutInfoSave({ checkoutInfo: res.data, status: "loading" }));
    },
    (err) => {
      dispatch(checkoutSetStatusFailed());
    }
  );
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    checkoutInfoSave: (state, action: PayloadAction<ICheckoutData>) => {
      state.checkoutInfo = action.payload.checkoutInfo;
      state.status = "successfullyLoadedCheckout";
    },
    checkoutOrderPlace: (state) => {
      state.status = "orderPlaced";
    },

    checkoutSetStatusFailed: (state) => {
      state.status = "failed";
    },
  },
});
export const { checkoutInfoSave, checkoutOrderPlace, checkoutSetStatusFailed } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
