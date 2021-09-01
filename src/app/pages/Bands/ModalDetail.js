import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { getAlbums } from "./services";

const ModalDetail = ({ bandId, members }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		setLoading(true);
		getAlbums(bandId)
			.then(({ data }) => {
				setData(data);
			})
			.catch(() => {});
		setLoading(false);
	}, [bandId]);

	return (
		<>
			<Container>
				<Row>
					<Col xs={6}>
						<h4>Members:</h4>
						{!loading && members && members.length > 0
							? members
									.sort(function (a, b) {
										var textA = a.name.toUpperCase();
										var textB = b.name.toUpperCase();
										return textA < textB ? -1 : textA > textB ? 1 : 0;
									})
									.map((elem) => {
										return (
											<>
												<p>{elem.name}</p>
											</>
										);
									})
							: ""}
					</Col>
					<Col xs={6}>
						<h4>Albums</h4>
						{!loading && data && data.length > 0
							? data.map((elem) => {
									console.log(data);
									return (
										<>
											<p>{elem.name}</p>
										</>
									);
							  })
							: ""}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ModalDetail;
