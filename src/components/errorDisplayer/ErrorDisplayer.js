import styles from "./ErrorDisplayer.module.scss";

//Display error message that comes with props.
const ErrorDisplayer = (props) => {

    return <div className={styles.errorMessage}>
            <h1>Opps! There was an error!</h1>
            <h3>Error: {props.errorMessage}</h3>
    </div>
}

export default ErrorDisplayer;