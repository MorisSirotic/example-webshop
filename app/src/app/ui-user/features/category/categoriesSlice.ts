import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../../common/services/helpers/http";
import { RootState } from "../../../common/store";
export interface ICategoryData {
  id: number;
  name: string;
  alias: string;
  image: string;
}
export enum SortType {
  PRICE_ASC,
  PRICE_DESC,
  TITLE_ASC,
  TITLE_DESC,
  DATE_ASC,
  DATE_DESC,
  PROMOTION,

  SIZE_XS,
  SIZE_S,
  SIZE_M,
  SIZE_ML,
  SIZE_L,
  SIZE_XL,

  COLOR_WHITE,
  COLOR_BLACK,
  COLOR_YELLOW,
  COLOR_RED,
  COLOR_GREEN,
  COLOR_BLUE,
}

interface CategoryState {
  categories: Array<ICategoryData>;
  status: "idle" | "loading" | "success" | "failed";
  sort?: SortType;
}
const initialState: CategoryState = {
  categories: [],
  status: "idle",
  sort: SortType.PROMOTION,
};

export const categoriesAsync = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await http.get("api/categories/root");

    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    categoriesSave: (state, action: PayloadAction<CategoryState>) => {
      state.categories = action.payload.categories;
    },
    categoriesClear: (state) => {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
      })
      .addCase(categoriesAsync.rejected, (state) => {
        state.categories = [];
        state.status = "failed";
      });
  },
});

export const selectItems = (state: RootState) => state.items;
export const selectEditableItems = (state: RootState) => [...state.items.items];

export const { categoriesSave, categoriesClear } = categoriesSlice.actions;
export default categoriesSlice.reducer;
