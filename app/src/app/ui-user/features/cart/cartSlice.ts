import { ProductionQuantityLimitsSharp } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartService } from "../../../common/services/cart.service";
import { userIsLoggedIn } from "../../../common/services/helpers/authHeader";
import { AppThunk } from "../../../common/store";
import { alertCustom, alertSuccess } from "../alert/alertSlice";

export interface ICartProduct {
  product: {
    id: number;
    name: string;
    price: number;
    mainImage: string;
    shippingCost: number;
  };
  quantity: number;
  subtotal: number;
}
export interface ICart {
  products: Array<ICartProduct>;
  status: "idle" | "loading" | "success" | "failed";
  totalSize: number | 0;
}

interface IStatus {
  status: "idle" | "loading" | "success" | "failed";
}
const initialState: ICart = {
  products: [],
  status: "idle",
  totalSize: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartAddItem: (state, action: PayloadAction<number>) => {
      state.status = "success";
      state.totalSize = state.products.length + action.payload;
    },
    cartFilter: (state, action: PayloadAction<Number>) => {
      state.status = "success";

      const filtered = state.products.filter(
        (p) => p.product.id != action.payload
      );
      state.products = filtered;
    },
    cartSaveProducts: (state, action: PayloadAction<ICart>) => {
      state.products = action.payload.products;
      state.status = "success";
    },
  },
});
export const { cartAddItem, cartSaveProducts, cartFilter } = cartSlice.actions;
export default cartSlice.reducer;

export const cartGet = (): AppThunk => (dispatch, getState) => {
  CartService.getCart().then(
    (res) => {
      const a: Array<ICartProduct> = res.data;
      dispatch(
        cartSaveProducts({
          status: "success",
          products: res.data,
          totalSize: a.length,
        })
      );
    },
    (err) => {
      dispatch(alertCustom({ message: "Failed v2" }));
    }
  );
};

export const cartAddProduct =
  (productId: number, quantity: number): AppThunk =>
  (dispatch) => {
    if (userIsLoggedIn()) {
      CartService.addItemToCart(productId, quantity).then(
        (res) => {
          dispatch(cartAddItem(1));
          dispatch(alertSuccess({ message: "Added Product To The Cart!" }));
        },
        (err) => {
          dispatch(
            alertCustom({
              message: "Couldn't Add Product To The Cart. Try again later.",
            })
          );
        }
      );
    } else {
      dispatch(
        alertCustom({
          message: "You need to log in first to add items to your cart",
        })
      );
    }
  };
export const cartDeleteProduct =
  (productId: number): AppThunk =>
  (dispatch, getState) => {
    CartService.delete(productId).then(
      (res) => {
        dispatch(cartFilter(productId));
      },
      (err) => {
        dispatch(
          alertCustom({
            message: "Couldn't Delete. Try again later.",
          })
        );
      }
    );
  };
