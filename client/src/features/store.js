import { configureStore } from "@reduxjs/toolkit";
import { authLoginSlice, authSignupSlice } from "./AuthSlice";

const store = configureStore({
    reducer: {
        authSignup: authSignupSlice.reducer,
        authLogin: authLoginSlice.reducer,
    },
    devTools: false
});

export default store;