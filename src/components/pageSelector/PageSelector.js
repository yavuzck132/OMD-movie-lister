import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row } from "react-bootstrap";
import { searchParamActions } from "../../store/searchSlice";
import styles from "./PageSelector.module.scss";

//Page selector component, which allows user to switch between list pages.
const PageSelector = () => {
    //Initialize states
    const searchValues = useSelector((state) => state.searchParam);
    const totalResults = useSelector((state) => state.movieList.totalResults);
    const dispatch = useDispatch();
    //Get last page of the list
    const lastPage = Math.ceil(totalResults/10)

    //Update redux state when the page changes
    const updatePage = (newPage) => {
        dispatch(searchParamActions.updatePage({...searchValues, page: newPage}))        
    }

    //Buttons will be unclickable if the user is at very first page, or very last page.
    return <Container>
            <Row className={styles.pageButtonWrapper}>
                <Button onClick={() => updatePage(searchValues.page - 1)} disabled={searchValues.page === 1 ?? true}>Prev</Button>
                <span>  {searchValues.page} / {lastPage}  </span>            
                <Button onClick={() => updatePage(searchValues.page + 1)} disabled={searchValues.page === lastPage ?? true}>Next</Button>
            </Row>
        </Container>
}

export default PageSelector;