import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPokemons } from "../api/fetchData";
const initialState = {
  list: [],
  currentEnd: 21,
  status: "idle",
};

export const fetchItems = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (offset) => {
    const response = await fetchPokemons(offset - 20, offset);
    return response;
  }
);

export const counterSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = [...state.list, ...action.payload];
        state.currentEnd += 20;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { setValue } = counterSlice.actions;

export const selectList = (state) => state.pokemons.list;

export default counterSlice.reducer;
