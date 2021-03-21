import { createSlice } from "@reduxjs/toolkit";

const runSlice = createSlice({
  name: "run",
  initialState: false,
  reducers: {
    setRun(state, action) {
      return action.payload;
    },
  },
});

export const { setRun } = runSlice.actions;
export default runSlice.reducer;