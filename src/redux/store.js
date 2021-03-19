import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import runReducer from "./runSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
   run: runReducer
  },
});


export default store;