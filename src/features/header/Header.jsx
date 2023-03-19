import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Styles from "./Header.module.css";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const goHome = () => {
		if (location.pathname !== "/") navigate("/");
	};

	return (
		<div className={Styles.header}>
			<div className={Styles.logo} onClick={goHome}>
				<img src="./geektrustIcon.svg" alt="GeekTrust" />
				GeekTrust
			</div>
			<div className={Styles.heading}>Finding Falcone!</div>
			<div className={Styles.links}>
				<Link className={Styles.link} to="/">
					Home
				</Link>
				<Link className={Styles.link} to="/result">
					Result
				</Link>
				<div className={`${Styles.link} ${Styles.resetButton}`}>
					Reset
				</div>
			</div>
		</div>
	);
};

export default Header;
