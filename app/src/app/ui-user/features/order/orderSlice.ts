import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../../common/services/helpers/http";
import { OrderService } from "../../../common/services/order.service";
import { AppThunk } from "../../../common/store";
import { alertCustom } from "../alert/alertSlice";
interface IStatus {
  status: "idle" | "loading" | "success" | "failed";
}
export interface OrderProduct {
  product: {
    id: number;
    price: number;
    mainImage: string;
    shortName: string;
  };
  quantity: number;
}

interface OrderTrack {
  notes: string;
  status: string;
}

export interface IOrderData {
  id: number;
  orderTime: string;
  deliverDays: string;
  deliverDateOnForm: string;
  status: string;
  total: number;
  orderStatus: OrderTrack[];
  orderDetails: OrderProduct[];
}

interface IOrder {
  orders: Array<IOrderData>;
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: IOrder = {
  orders: [],
  status: "idle",
};
export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    orderLoad: (state, action: PayloadAction<IOrder>) => {
      state.orders = action.payload.orders;
      state.status = "success";
    },
  },
});
export const { orderLoad } = orderSlice.actions;
export default orderSlice.reducer;

export const orderGet = (): AppThunk => (dispatch) => {
  OrderService.getByPage(1, "orderTime", "desc").then(
    (res) => {
      dispatch(orderLoad({ status: "success", orders: res.data }));
    },
    (err) => {
      dispatch(
        alertCustom({
          message: "Couldn't get your Orders. Please try again later.",
        })
      );
    }
  );
};

export const orderPlace = (): AppThunk => (dispatch) => {
  http.post("/place_order").then(
    (res) => {
      console.log("res");
      window.location.reload();
    },
    (err) => {
      dispatch(
        alertCustom({
          message: "Couldn't process your order. Please try again later.",
        })
      );
    }
  );
};
