import { createSlice } from "@reduxjs/toolkit";

//Initialize result list state
const initialState = {Response: "False", Search: [], totalResults: "0", Error: "", Episodes: [], totalSeasons: ""}

const getMoviesSlice = createSlice({
    name: 'get-movies',
    initialState,
    reducers: {
        //Update movie list reducer method
        updateMovieList: (state, action) => {
            if(action.payload.Response === "False"){
                state.Search = [];
                state.totalResults = "0";
                state.Error = action.payload.Error;
                state.totalSeasons = "";
                state.Episodes = [];
            }else{
                state.Search = action.payload.Search;
                state.Episodes = action.payload.Episodes;
                state.totalResults = action.payload.totalResults;
                state.totalSeasons = action.payload.totalSeasons;
                state.Error = "";
            }
            state.Response = action.payload.Response;
        }
    }
});

export const getMoviesActions = getMoviesSlice.actions;

export default getMoviesSlice;