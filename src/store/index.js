import { configureStore } from '@reduxjs/toolkit';

import searchParamSlice from './searchSlice';
import getMoviesSlice from './getMovieSlice';

//Store that will allow calling redux reducer methods
const store = configureStore({
  reducer: { searchParam: searchParamSlice.reducer, movieList: getMoviesSlice.reducer },
});

export default store;