import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import addressSlice from "../ui-user/features/address/addressSlice";
import alertSlice from "../ui-user/features/alert/alertSlice";
import authenticationSlice from "../ui-user/features/authentication/authenticationSlice";
import cartSlice from "../ui-user/features/cart/cartSlice";
import categoriesSlice from "../ui-user/features/category/categoriesSlice";
import checkoutSlice from "../ui-user/features/checkout/checkoutSlice";
import itemSlice from "../ui-user/features/item/itemSlice";
import itemsSlice from "../ui-user/features/items/itemsSlice";
import orderSlice from "../ui-user/features/order/orderSlice";
import userSlice from "../ui-user/features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    items: itemsSlice,
    alerts: alertSlice,
    cart: cartSlice,
    item: itemSlice,
    authentication: authenticationSlice,
    categories: categoriesSlice,
    checkout: checkoutSlice,
    order: orderSlice,
    address: addressSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
