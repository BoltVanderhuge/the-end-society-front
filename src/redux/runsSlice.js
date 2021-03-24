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
    deleteRuns(state, action) { 
      return (state.filter((run) => run.id !== action.payload.id))},
  },
});

export const { setRuns,addToRuns,editRuns,deleteRuns } = runsSlice.actions;
export default runsSlice.reducer;

// (state, action) => state.list.filter((run) => run.slug !== action.payload.slug)
// (state, action) { state.list.filter((run) => run.slug !== action.payload.slug)}