import { useEffect, useState } from "react";
import SearchInputs from "../../components/searchInputs/SearchInputs";
import { fetchMovieData } from "../../store/getMovieAction";
import { useDispatch, useSelector } from "react-redux";
import PageSelector from "../../components/pageSelector/PageSelector";
import Table from "../../components/table/Table";
import styles from "./ListPage.module.scss";
import ErrorDisplayer from "../../components/errorDisplayer/ErrorDisplayer";

//List page will display list of search results
const ListPage = () => {
    //Initialize states
    const dispatch = useDispatch();
    const searchValues = useSelector((state) => state.searchParam);
    const searchList = useSelector((state) => state.movieList);
    const [data, setData] = useState([]);

    //useEffect will update and get data from API and assign it to redux state.
    //It will always trigger when search values updates.
    useEffect(() => {
        dispatch(fetchMovieData(searchValues));
    }, [dispatch, searchValues]);

    //useEffect will get movie list from redux and assign the correct values to data state 
    //It will always trigger when redux list updates.
    useEffect(() => {
        if(searchList.Search){
            setData(searchList.Search); 
        }else if(searchList.Episodes){
            setData(searchList.Episodes);
        }else if(searchList.Response === "False"){
            setData(searchList);
        }       
    }, [searchList]);
    

    return <div className={styles.mainWrap}>
        <SearchInputs totalSeasons={searchList.totalSeasons}/> 
        {/*Table and Page components will not be displayed if there was an error from fetching data.*/} 
        {/*Instead ErrorDisplayer component will be shown to show the user the error message.*/} 
        {searchList.Response === "False" ? <ErrorDisplayer errorMessage={searchList.Error}/> : <>
            {data.length > 0 ? <Table data={data}/> : <></>}
            {searchValues.type !== "episode" ? <PageSelector /> : <></>} 
        </>
        }
    </div>
}

export default ListPage;