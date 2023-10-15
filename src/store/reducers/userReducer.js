import { createSlice } from "@reduxjs/toolkit";

const initialValue = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : null;

const userSlice = createSlice({
    name:"user",
    initialState:{
        userInfo: initialValue
    },
    reducers:{
        setUserInfo(state,action){
            state.userInfo = action.payload;
        },
        resetUserInfo(state,action){
            state.userInfo = null;
        }
    }
});
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
 