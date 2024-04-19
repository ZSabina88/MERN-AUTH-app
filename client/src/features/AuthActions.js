import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const userSignup = createAsyncThunk(
    "auth/signup",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                "/register",
                { name, email, password },
                config
            );
            if (data.error) {
                // console.log(data.error);
                return rejectWithValue(data.error);
            }

        } catch (error) {
            if (error.response.status === 400) {
                return rejectWithValue("Missing username or password.")
            } else if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                "/",
                { email, password },
                config
            );
            if (data.error) {
                return rejectWithValue(data.error);
            }


            // localStorage.setItem('userToken', data.token);
            return data;
        } catch (error) {
            if (error.response.status === 400) {
                return rejectWithValue("Missing username or password.")
            } else if (error.response.data.status === 401) {
                return rejectWithValue("You are not authorised. Please register.")
            } else if (error.response) {
                return rejectWithValue("No server response.")
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);