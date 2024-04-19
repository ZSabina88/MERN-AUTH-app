import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "./AuthActions";

// const userToken = localStorage.getItem('userToken')
//     ? localStorage.getItem('userToken')
//     : null;

const initialState = {
    userInfo: null,
    // userToken,
    error: null,
    loading: false,
    success: false
};


const authSignupSlice = createSlice({
    name: "authsignup",
    initialState,
    reducers: {
    },
    extraReducers:
        (builder) => {
            builder.addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            builder.addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.userInfo = action.payload;
            })

            builder.addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
});
const authLoginSlice = createSlice({
    name: "authLogin",
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.loginStatus = '';
        //     state.token = undefined;
        //     state.user = undefined;
        //   },
    },
    extraReducers:
        (builder) => {
            builder.addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            builder.addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.userInfo = action.payload;
                // state.userToken = action.payload.token;
                // console.log(userToken);
            })

            builder.addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // state.error = action.error.message;
            })
        }
});


export { authLoginSlice, authSignupSlice };