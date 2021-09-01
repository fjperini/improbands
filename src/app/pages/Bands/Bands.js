import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../../state/globalState";
import { getBands } from "./services";
import Filters from "./Filters";
import ModalDetail from "./ModalDetail";
import { Container, Table, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const Bands = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	const [bandId, setBandId] = useState(false);
	const [bandName, setBandName] = useState(false);
	const [members, setMembers] = useState(false);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	/*
	Data for the Modal
	*/
	const getDetails = (bandId, bandName, members) => {
		setBandId(bandId);
		setBandName(bandName);
		setMembers(members);
		setShow(true);
	};

	/*
	Global filters
	*/
	const filterGlobal = useGlobalState((state) => state.filterGlobal);

	useEffect(() => {
		setLoading(true);

		let query = "";

		if (filterGlobal && filterGlobal.bands) {
			filterGlobal.bands.forEach((el) => {
				query += "id[]=" + el + "&";
			});
		}

		if (filterGlobal && filterGlobal.countries) {
			filterGlobal.countries.forEach((el) => {
				query += "country[]=" + el + "&";
			});
		}

		if (filterGlobal && filterGlobal.genres) {
			filterGlobal.genres.forEach((el) => {
				query += "genreCode[]=" + el + "&";
			});
		}

		if (filterGlobal && filterGlobal.years) {
			filterGlobal.years.forEach((el) => {
				query += "year[]=" + el + "&";
			});
		}

		getBands(query)
			.then(({ data }) => {
				setData(data);
			})
			.catch(() => {});
		setLoading(false);
	}, [filterGlobal]);

	return (
		<>
			<Container>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Band: {bandName}</Modal.Title>
					</Modal.Header>
					<ModalDetail bandId={bandId} members={members} onHide={handleClose} />
					<Modal.Footer>
						<Button variant="primary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				<Filters />

				<Table style={{ marginTop: "10px" }} striped bordered hover>
					<thead>
						<tr>
							<th>BAND</th>
							<th>GENRE</th>
							<th>YEAR</th>
							<th>COUNTRY</th>
							<th>DETAIL</th>
						</tr>
					</thead>
					<tbody>
						{!loading && data && data.length > 0
							? data.map((elem) => {
									return (
										<>
											<tr>
												<td>{elem.name}</td>
												<td>{elem.genreCode}</td>
												<td>{elem.year}</td>
												<td>{elem.country}</td>
												<td>
													<a
														href="/#"
														onClick={() => {
															getDetails(elem.id, elem.name, elem.members);
														}}
													>
														More
													</a>
												</td>
											</tr>
										</>
									);
							  })
							: ""}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default Bands;
