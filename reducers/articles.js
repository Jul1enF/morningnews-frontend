import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : [],
}

export const articlesSlice = createSlice({
    name : 'articles',
    initialState,
    reducers : {
    loadArticles : (state, action)=> {
        state.value = action.payload
    },
    }
})

export const {loadArticles} = articlesSlice.actions;
export default articlesSlice.reducer;