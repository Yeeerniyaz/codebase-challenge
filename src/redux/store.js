import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./slices/Note";

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});
