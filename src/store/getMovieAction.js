import { getMoviesActions } from "./getMovieSlice";

//Thunk method which will try to fetch data first, then return the action
export const fetchMovieData = (searchParam) => {
    //Return action
    return async (dispatch) => {
      //Create asynchronous method, which fetches data from backend api
      const fetchData = async () => {
        let path = 'https://www.omdbapi.com/?apikey=e56d929'
        if(searchParam.type === "episode"){
          path = path + "&t=" + searchParam.title + "&season=" + searchParam.season;
        }else{
          path = path + "&s=" + searchParam.title + "&page=" + searchParam.page + "&y=" + searchParam.year + "&type=" +searchParam.type;
        }
        const response = await fetch(path);
  
        if (!response.ok) {
          throw new Error('Could not fetch ' + searchParam.type + ' data!');
        }
  
        const data = await response.json();
  
        return data;
      };
      
      //Try and get data from backend and assign it to redux state
      //If there are errors, catch them.
      try {
        const movieData = await fetchData();
        if(movieData.Response === "True"){
          dispatch(getMoviesActions.updateMovieList({
              Response: movieData.Response, 
              Search: movieData.Search, 
              totalResults: movieData.totalResults,
              Episodes: movieData.Episodes,
              totalSeasons: movieData.totalSeasons}))
        }else{
          dispatch(getMoviesActions.updateMovieList({
              Response: movieData.Response, 
              Error: movieData.Error}))
        }
      }catch(error){
        dispatch(getMoviesActions.updateMovieList({
          Response: "False", 
          Error: "Fetching data failed!"}))
      }
    };
  };