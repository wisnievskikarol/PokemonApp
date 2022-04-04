import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./redux/itemsSlice";
export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});
