// create redux here

import { createSlice } from '@reduxjs/toolkit';

// state that will be stored inside the global state
// these data will be available/accesible throughout the entire application
// so can grab them whenever we want so we dont have to pass in state and properties down

//if we use redux, we should also use toolkit.

const initialState = {
    mode: "light", //dark and light mode
    user: null,
    token: null,
    posts: [],
};

// here we going to create simple fuctions that modify our state
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
        },
        setFriends: (state, action) => {
            if (state.user) { //if user already exists, we going to set friends inside our state
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent");
            }
        },
        setPosts: (state, action) => { // just going to set the posts
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post; //only update the post that was changed
                return post;
            });
            state.posts = updatedPosts; 
        },
    },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;