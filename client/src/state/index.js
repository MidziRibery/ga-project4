// create redux here

import { createSlice } from '@reduxjs/toolkit';

// state that will be stored inside the global state
// these data will be available/accesible throughout the entire application
// so can grab them whenever we want so we dont have to pass in state and properties down

//if we use redux, we should also use toolkit.

const initialState = {
    mode: "ligh", //dark and ligh mode
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => { //when hit logout button, it's going to reset.
            state.user = null;
            state.token = null;
        }
    }
})