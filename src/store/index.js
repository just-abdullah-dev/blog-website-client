import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { reducerSearchKeyword } from './reducers/searchKeyword';

const store = configureStore({
    reducer:{
        user:userReducer,
        searchKeyword: reducerSearchKeyword,
    },
})
export default store;
