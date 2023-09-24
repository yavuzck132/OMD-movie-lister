import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { searchParamActions } from "../../store/searchSlice";
import styles from "./SearchInputs.module.scss";

const SearchInputs = (props) => {
    //Initialize states
    const searchValues = useSelector((state) => state.searchParam);
    const dispatch = useDispatch();
    //Seperated the search values to smaller states to make managing them and checking the correct format easier.
    //Once user clicks search button, these values will be dispatched to redux if they pass the format.
    const [title, setTitle] = useState(searchValues.title);
    const [year, setYear] = useState(searchValues.year);
    const [season, setSeason] = useState(searchValues.season);
    const [yearError, setYearError] = useState(false);

    //Submit method, which checks for year state's format before dispatching it to redux and fetching the new list.
    //If the year is not in correct method, this method will not allow user to make a new search until the user fixes year input format.
    const submitSearch = (newType) => {
        const regex = /^\d{4}$/;
        if(newType !== "episode"){
            setSeason(1);
        }
        //If the year format correct, update redux search states. If the year not in correct format, display the message to the user.
        if(regex.test(year) || year === ""){
            setYearError(false);
            dispatch(searchParamActions.searchMovie({title: title, 
                year: year,
                type: newType,
                season: season}))
        }else{
            setYearError(true);
        }
        
    }

    return <>
        <Container className="">
        <Row className={styles.buttonWrap}>
            <Button className={searchValues.type === "movie" ? styles.selectedButton : ""} onClick={() => submitSearch("movie")}>Movies</Button>
            <Button className={searchValues.type === "game" ? styles.selectedButton : ""} onClick={() => submitSearch("game")}>Games</Button> 
            <Button className={searchValues.type === "series" ? styles.selectedButton : ""} onClick={() => submitSearch("series")}>Series</Button>            
            <Button className={searchValues.type === "episode" ? styles.selectedButton : ""} onClick={() => submitSearch("episode")}>Episodes</Button>
        </Row>
        <Row>
            <Form.Group className={styles.inputWrap}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    defaultValue={searchValues.title}
                    onChange={(e) => setTitle(e.target.value)} 
                    />
            </Form.Group>
            <Form.Group className={styles.inputWrap}>
                <Form.Label>Year</Form.Label>
                <Form.Control
                    name="year"
                    type="number"
                    defaultValue={searchValues.year}
                    onChange={(e) => setYear(e.target.value)} 
                    />
            </Form.Group>
            {yearError ? <span className={styles.yearWarning}>Please give year in YYYY format or leave it empty!</span> : <></>}
        {/*User will only be able to update season if the user is searching episodes only*/}
        {/*If the user changes the search type, season state will return to 1 to prevent future possible bugs.*/}
        {searchValues.type === "episode" ? 
                <Col>
                    <Form.Group className={styles.inputWrap}>
                        <Form.Label>Season</Form.Label>
                        <Form.Control
                            name="season"
                            type="number"
                            defaultValue={searchValues.season}
                            onChange={(e) => setSeason(e.target.value)} 
                            />
                            <span className={styles.seasonLabel}>/{props.totalSeasons}</span>
                    </Form.Group>                    
                </Col>
             : <></>}
            </Row>
        <Row>
            <Button className={styles.searchButton} onClick={() => submitSearch(searchValues.type)}>Search</Button>
        </Row>
        </Container>
    </>
}

export default SearchInputs;