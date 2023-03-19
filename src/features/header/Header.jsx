import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={Styles.header}>
			<Link to="/">Home</Link>
			<Link to="/result">Result</Link>
			<Link to="/error">Error</Link>
		</div>
	);
};

export default Header;
