import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import NoPage from "./Pages/404NotFound";
import ResultPage from "./Pages/ResultPage";
import Background from "./features/background/Background";

function App() {
	return (
		<div>
			<Background />
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<HomePage />} />
						<Route path="result" element={<ResultPage />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
