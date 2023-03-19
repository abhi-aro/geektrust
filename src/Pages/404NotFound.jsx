import React from "react";
import Empty from "../features/empty/Empty";
import Footer from "../features/footer/Footer";
import Header from "../features/header/Header";

const NoPage = () => {
	return (
		<div>
			<Header />
			<Empty />
			<Footer />
		</div>
	);
};

export default NoPage;
