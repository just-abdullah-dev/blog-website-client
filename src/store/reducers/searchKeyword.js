
import { createSlice } from "@reduxjs/toolkit";

const searchKeywordSlice = createSlice({
    name:"searchKeyword",
    initialState:{
        searchKeyword: ''
    },
    reducers:{
        setSearchKeyword(state,action){
            state.searchKeyword = action.payload;
        }
    }
});
const actionsSearchKeyword = searchKeywordSlice.actions;
const reducerSearchKeyword = searchKeywordSlice.reducer;

export { actionsSearchKeyword, reducerSearchKeyword };