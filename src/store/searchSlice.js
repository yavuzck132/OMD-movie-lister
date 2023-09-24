import { createSlice } from "@reduxjs/toolkit";

//Initialize search state
const initialState = { title: "Pokemon", year: "", type: "movie", page: 1, season: 1}

const searchParamSlice = createSlice({
    name: 'search-params',
    initialState,
    reducers: {
        //Update search reducer method
        searchMovie: (state, action) => {
            state.title = action.payload.title;
            state.type = action.payload.type;
            state.year = action.payload.year;
            if(action.payload.type === "episode"){
                state.season = action.payload.season;
                state.page = ""
            }else{
                state.season = 1;
                state.page = 1;
            }
        },//Update page reducer method
        updatePage: (state, action) => {
            state.page = action.payload.page;
        }
    }
});

export const searchParamActions = searchParamSlice.actions;

export default searchParamSlice;