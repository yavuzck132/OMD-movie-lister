import { useEffect, useState } from "react";
import styles from "./DetailsPage.module.scss";
import { useParams } from "react-router-dom";
import ErrorDisplayer from "../../components/errorDisplayer/ErrorDisplayer";
import NoImagePhoto from "../../public/noImage.jpg";

//Details page will show the movie details only.
//Since this page has no other actions that changes states, basic functional react is enough.
const DetailsPage = () => {
    //Initialize states
    const params = useParams();
    const [details, setDetails] = useState();
    const [isLoading, setLoading] = useState(true);
    
    //Fetch data in this useEffect method.
    //This useEffect method is being called only once, when this component opens.
    useEffect(() => {
        //Create asynchronous method, which fetches data from backend
        const fetchData = async () => {
            let path = 'https://www.omdbapi.com/?apikey=e56d929'
            path = path + "&i=" + params.imdbID
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('Could not fetch data!');
            }        
            const data = await response.json()
            setDetails(data);
        }
        //Try and get data from backend and assign it to useStates
        //If there are errors, catch them.
        try{
            fetchData();
        }catch(error){
            setDetails({Response: "False", Error: "Could not fetch data!"});
        }
        
        //Set loading to false.
        setLoading(false)
    }, []);

    //If loading is true or the details data state is emty, keep returning Loading message.
    if(isLoading || !details) return <div>Loading...</div>
    //If there was an error with fetching data, display the error to the user.
    if(details.Response === "False") return <ErrorDisplayer errorMessage={details.Error} />
    //If there was no problem, display the page.
    return <div className={styles.mainWrap}>
        <div>
            {/*Show image if awailable*/}
            {details.Poster ? <img src={details.Poster} /> : <img src={NoImagePhoto}/>}
        </div>
        <div>
            <h3>Title: </h3>
            <h3>Runtime: </h3>
            <h3>Genre: </h3>
            <h3>Director: </h3>
            <h3>Actors: </h3>
            <h3>IMDB Rating: </h3>
        </div>
        <div>
            <h3>{details.Title}</h3>
            <h3>{details.Runtime}</h3>
            <h3>{details.Genre}</h3>
            <h3>{details.Director}</h3>
            <h3>{details.Actors}</h3>
            <h3>{details.imdbRating}</h3>
        </div>
        
    </div>
}

export default DetailsPage;