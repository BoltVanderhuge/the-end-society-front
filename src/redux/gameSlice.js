import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {},
  reducers: {
    setGame(state, action) {
      return action.payload;
    },
  },
});

export const { setGame } = gameSlice.actions;
export default gameSlice.reducer;