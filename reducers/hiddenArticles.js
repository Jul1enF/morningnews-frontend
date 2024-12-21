import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : [],
}

export const hiddenArticlesSlice = createSlice({
    name : 'hiddenArticles',
    initialState,
    reducers : {
    addHiddenArticle : (state, action)=> {
        state.value.push(action.payload)
    },
    removeHiddenArticle : (state, action)=>{
        state.value = state.value.filter(e=> e!== action.payload)
    },
    removeAllHiddenArticles : (state, action) =>{
        state.value = []
    }
    }
})

export const {addHiddenArticle, removeHiddenArticle, removeAllHiddenArticles} = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;