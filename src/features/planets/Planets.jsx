import React from "react";
import { useSelector } from "react-redux";
import { getAllPlanets } from "../home/homeSlice";
import Styles from "./Planets.module.css";

const Planets = () => {
	const planets = useSelector(getAllPlanets);

	return (
		<div className={Styles.planetsContainer}>
			{planets?.map((planet) => (
				<div key={planet?.name}>{planet?.name}</div>
			))}
		</div>
	);
};

export default Planets;
