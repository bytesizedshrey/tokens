import { createSlice } from "@reduxjs/toolkit";

export let authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        isLoading : true,
    },
    reducers : {
        addUser : (state,actions) => {
            state.user = actions.payload
            state.isLoading = false
        },
        removeUser : (state) => {
            state.user = null;
            state.isLoading = false;
        }
    }
})

export let {addUser,removeUser} = authSlice.actions