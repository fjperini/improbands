import React, { useEffect, useState } from "react";
import { getBands, getGenres } from "./services";
import { useGlobalState } from "../../../state/globalState";
import { Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./styles.css";

const countries = [
	{ label: "United States" },
	{ label: "Brazil" },
	{ label: "United Kingdom" },
	{ label: "Italy" },
]
	.sort(function (a, b) {
		var textA = a.label.toUpperCase();
		var textB = b.label.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	})
	.map((asignation) => ({
		value: asignation.label,
		label: asignation.label,
	}));

const years = [
	{ label: "1970" },
	{ label: "1991" },
	{ label: "1985" },
	{ label: "1975" },
	{ label: "1973" },
	{ label: "1981" },
	{ label: "1990" },
	{ label: "1995" },
	{ label: "1960" },
]
	.sort(function (a, b) {
		var textA = a.label.toUpperCase();
		var textB = b.label.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	})
	.map((asignation) => ({
		value: asignation.label,
		label: asignation.label,
	}));

function Filters() {
	const [bands, setBands] = useState(null);
	const [genres, setGenres] = useState(null);

	const animatedComponents = makeAnimated();

	const [filtrosLocal, setFiltrosLocal] = useState({});

	const setFiltroGlobal = useGlobalState((state) => state.setFiltroGlobal);

	const handleChange = (campo, val) => {
		let ids = null;
		if (val) {
			if (Array.isArray(val)) {
				ids = val.map((el) => {
					return el.value;
				});
			} else {
				ids = val.value;
			}
		}

		let newFiltros = Object.assign({}, filtrosLocal);
		newFiltros[campo] = ids;

		setFiltrosLocal(newFiltros);
	};

	useEffect(() => {
		getBands()
			.then(({ data }) => {
				let units = [];
				data.forEach((unit) => {
					units[unit.id] = unit;
				});

				setBands(data);
			})
			.catch(() => {});

		getGenres()
			.then(({ data }) => {
				let units = [];
				data.forEach((unit) => {
					units[unit.id] = unit;
				});

				setGenres(data);
			})
			.catch(() => {});
	}, []);

	const doSearch = () => {
		let newFiltros = Object.assign({}, filtrosLocal);

		setFiltroGlobal(newFiltros);
	};

	const optionsBands = bands
		? bands.map((item) => {
				return { value: item.id, label: item.name };
		  })
		: [];

	const optionsGenres = genres
		? genres.map((item) => {
				return { value: item.code, label: item.name };
		  })
		: [];

	const optionsYears = years ? years : [];

	const optionsCountries = countries ? countries : [];

	return (
		<>
			<Row className="blue pt-1" style={{ marginTop: "10px" }}>
				<Col>
					<Select
						name="bands"
						options={optionsBands}
						isMulti={true}
						className={`no-border h-auto`}
						components={animatedComponents}
						placeholder={"Band..."}
						onChange={(val) => {
							handleChange("bands", val);
						}}
					/>
				</Col>
				<Col>
					<Select
						name="genres"
						options={optionsGenres}
						isMulti={true}
						className={`no-border h-auto`}
						components={animatedComponents}
						placeholder={"Genre..."}
						onChange={(val) => {
							handleChange("genres", val);
						}}
					/>
				</Col>
				<Col>
					<Select
						options={optionsYears}
						isMulti={true}
						name="years"
						className={`no-border h-auto`}
						components={animatedComponents}
						onChange={(val) => {
							handleChange("years", val);
						}}
						placeholder={"Year..."}
					/>
				</Col>
				<Col>
					<Select
						options={optionsCountries}
						isMulti={true}
						name="countries"
						className={`no-border h-auto`}
						components={animatedComponents}
						onChange={(val) => {
							handleChange("countries", val);
						}}
						placeholder={"Country..."}
					/>
				</Col>
				<Col>
					<Button className="primary" onClick={doSearch}>
						Search
					</Button>
				</Col>
			</Row>
		</>
	);
}

export default Filters;
