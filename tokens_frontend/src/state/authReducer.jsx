import { createSlice } from "@reduxjs/toolkit";

export let authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
    },
    reducers : {
        addUser : (state,actions) => {
            state.user = actions.payload
        }
    }
})

export let {addUser} = authSlice.actions