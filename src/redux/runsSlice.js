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
    editRuns(state, action) {
      const index = state.findIndex( run => run.id === action.payload.id)
      state[index] = action.payload
    },
  },
});

export const { setRuns,addToRuns,editRuns } = runsSlice.actions;
export default runsSlice.reducer;