import { createSlice } from "@reduxjs/toolkit";

const runsSlice = createSlice({
  name: "runs",
  initialState: [],
  reducers: {
    setRuns(state, action) {
      return action.payload;
    },
  },
});

export const { setRuns } = runsSlice.actions;
export default runsSlice.reducer;