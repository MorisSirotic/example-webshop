import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../../common/services/helpers/http";
import { IItemData } from "../items/itemsSlice";

interface Color {
  name: string;
  hex: string;
}

interface IItemDetailData {
  item: IItemData;
  status: "idle" | "loading" | "success" | "failed";
}
const initialState: IItemDetailData = {
  status: "idle",

  item: {
    id: 1,
    category: "",
    description: "",
    mainImage: "",
    price: 0,
    amount: 0,
    name: "",
    fullDescription: "",
  },
};
export const itemAsync = createAsyncThunk(
  "item/fetchItem",
  async (id: any | "") => {
    const response = await http.get(`api/items/${id}`);

    return response.data;
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState: initialState,
  reducers: {
    itemChangeColor: (state, action: PayloadAction<Color>) => {
      // state.details.color = action.payload;
    },
    itemChangeSize: (state, action: PayloadAction<string>) => {
      // state.details.size = action.payload;
    },
    itemChangeAmount: (state, action: PayloadAction<number>) => {
      // if (!(state.details.amount + action.payload <= 0)) {
      //   state.details.amount += action.payload;
      // }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(itemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(itemAsync.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = "success";
      })
      .addCase(itemAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const { itemChangeColor, itemChangeSize, itemChangeAmount } =
  itemSlice.actions;
export default itemSlice.reducer;
