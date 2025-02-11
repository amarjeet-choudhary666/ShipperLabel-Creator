import {configureStore} from "@reduxjs/toolkit";
import formReducer from "../features/todoSlice.js";

export const store = configureStore({
    reducer: {
        form: formReducer,
    },
})