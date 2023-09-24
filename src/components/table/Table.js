import { useNavigate } from "react-router-dom";
import styles from "./Table.module.scss"

const Table = (props) => {
	const navigate = useNavigate()

	//Progromatically change page to clicked list item
	const navigateHandler = (imdbId) =>{
		navigate(`/${imdbId}`)
	}

	return (
		<div className={styles.tableWrap}>
			<table>
				<tbody>
				<tr>
					<th>Title</th>
					<th>Release date</th>
					<th>IMDB id</th>
				</tr>
				{props.data.map((val) => {
					return (
							<tr key={val.imdbID}>
								<td>{val.Title}</td>
								{/*Tarnery operator used to display correct data, depending on the fetched data*/}
								{val.Year ? <td>{val.Year}</td> : <td>{val.Released}</td>}
								{/*By clicking this table data, user can navigate to the detail page*/}
								<td className={styles.detailLink} onClick={()=>navigateHandler(val.imdbID)}>{val.imdbID}</td>
							</tr>
					)
				})}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
