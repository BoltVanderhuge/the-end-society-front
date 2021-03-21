import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import runReducer from "./runSlice";
import runsReducer from "./runsSlice";
import gameReducer from "./gameSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    run: runReducer,
    runs: runsReducer,
    game: gameReducer,
  },
});


export default store;