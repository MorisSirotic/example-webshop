import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../../common/services/helpers/http";
import { AppThunk, RootState } from "../../../common/store";
import { alertCustom } from "../alert/alertSlice";

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

export interface IItemData {
  id: number;
  name: string;
  price: number;
  amount: number;
  description: string;
  category: string;
  mainImage: string;
  fullDescription: string;
}
interface ItemState {
  items: Array<IItemData>;
  status: "idle" | "loading" | "success" | "failed";
  sort?: SortType;
}
const initialState: ItemState = {
  items: [],
  status: "idle",
  sort: SortType.PROMOTION,
};
export enum SearchType {
  CATEGORY,
  SEARCH_TERM,
}

export interface ISearch {
  value: string | undefined;
  type: SearchType;
}
export const itemsAsync = createAsyncThunk(
  "items/fetchItems",
  async (searchTerm?: ISearch) => {
    if (searchTerm?.value == undefined) {
      const response = await http.get("api/items/");
      return response.data;
    } else {
      if (searchTerm.type === SearchType.CATEGORY) {
        const response = await http.get(
          `api/items/category/${searchTerm.value}`
        );
        return response.data;
      } else if (searchTerm.type === SearchType.SEARCH_TERM) {
        const response = await http.get(`api/items/search/${searchTerm.value}`);
        return response.data;
      }
    }
  }
);

export const itemsSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {
    itemsSave: (state, action: PayloadAction<ItemState>) => {
      state.items = action.payload.items;
    },
    itemsSort: (state, action: PayloadAction<SortType>) => {
      state.items.reverse();
    },
    itemsClear: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(itemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(itemsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(itemsAsync.rejected, (state) => {
        state.items = [];
        state.status = "failed";
      });
  },
});

export const selectItems = (state: RootState) => state.items;
export const selectEditableItems = (state: RootState) => [...state.items.items];

export const getItemsWithAlert = (): AppThunk => (dispatch, getState) => {
  const items = selectItems(getState());

  if (items.status === "success") {

  } else if (items.status === "failed") {
    dispatch(
      alertCustom({
        message:
          "Something went wrong with aquiring items. Please try again later.",
      })
    );
  }
};

export const sortItemsCustom =
  (sort: SortType): AppThunk =>
  (dispatch, getState) => {
    let sorted;

    const type: SortType = SortType[sort as unknown as keyof typeof SortType];
    const state = selectEditableItems(getState());

    switch (type) {
      case SortType.PRICE_ASC: {
        sorted = state.sort((curr, prev) => curr.price - prev.price);

        break;
      }

      case SortType.PRICE_DESC: {
        sorted = state.sort((curr, prev) => prev.price - curr.price);

        break;
      }

      case SortType.TITLE_ASC: {
        sorted = state.sort((curr, prev) => {
          if (curr.name > prev.name) {
            return -1;
          } else if (curr.name > prev.name) {
            return 1;
          } else return 0;
        });

        break;
      }

      case SortType.TITLE_DESC: {
        sorted = state.sort((curr, prev) => {
          if (curr.name < prev.name) {
            return -1;
          } else if (curr.name < prev.name) {
            return 1;
          } else return 0;
        });

        break;
      }

      default:
        sorted = state;
    }

    dispatch(itemsSave({ items: sorted, status: "success" }));
  };

export const { itemsSave, itemsClear, itemsSort } = itemsSlice.actions;
export default itemsSlice.reducer;
