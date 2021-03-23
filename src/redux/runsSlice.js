import { createSlice } from "@reduxjs/toolkit";

const runsSlice = createSlice({
  name: "runs",
  initialState: [],
  reducers: {
    setRuns(state, action) {
      return action.payload;
    },
    addToRuns(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setRuns,addToRuns } = runsSlice.actions;
export default runsSlice.reducer;