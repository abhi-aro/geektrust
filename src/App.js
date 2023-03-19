import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import NoPage from "./Pages/404NotFound";
import ResultPage from "./Pages/ResultPage";
import useWindowSize from "./features/customHooks/useWindowSize";

function App() {
	const MIN_STARS = 100;
	const MAX_STARS = 200;
	const STAR_RANGE = Math.floor(
		Math.random() * (MAX_STARS - MIN_STARS) + MIN_STARS
	);

	const background = useRef(null);
	const [width, height] = useWindowSize();

	const [starCount, setStarCount] = useState(STAR_RANGE);
	const [keySequence, setKeySequence] = useState([]);
	const [secretKey, setSecretKey] = useState("8008135".split(""));

	const createStar = useCallback((width, height, existingStars) => {
		if (existingStars?.length > MAX_STARS) return;

		const star = document.createElement("i");
		star.classList.add("star");

		const size = Math.random() * 3;
		const duration = Math.random() * 2;

		const x = Math.floor(Math.random() * width);
		const y = Math.floor(Math.random() * height);

		star.style.width = 1 + size + "px";
		star.style.height = 1 + size + "px";

		star.style.top = y + "px";
		star.style.left = x + "px";

		star.style.animationDuration = 2 + duration + "s";
		star.style.animationDelay = duration + "s";

		background.current.appendChild(star);
	}, []);

	const removeStar = useCallback((stars) => {
		const starRate = Math.floor(Math.random() * (1000 - 100) + 100);
		setTimeout(
			() =>
				stars[
					Math.floor(Math.random() * (stars?.length - 1) + 1)
				].remove(),
			starRate
		);
	}, []);

	const checkEqual = (arr1, arr2) => {
		for (let i = 0; i < arr1?.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	};

	useEffect(() => {
		const starRate = Math.floor(Math.random() * (1000 - 100) + 100);
		if (height === 0 || width === 0) return;

		const existingStars = [...background.current.querySelectorAll(".star")];

		if (existingStars?.length > 0) {
			removeStar(existingStars);
		}

		for (let i = 0; i < starCount; i++) {
			createStar(width, height, existingStars);
		}

		const shiftStars = setInterval(() => {
			const existingStars = [
				...background.current.querySelectorAll(".star"),
			];
			createStar(width, height, existingStars);
			removeStar(existingStars);
		}, starRate);

		return () => clearInterval(shiftStars);
	}, [removeStar, createStar, starCount, width, height]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (secretKey?.includes(event?.key)) {
				setKeySequence((prev) => [...prev, event?.key]);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [secretKey]);

	useEffect(() => {
		if (secretKey?.length === keySequence?.length) {
			if (checkEqual(secretKey, keySequence)) {
				console.debug(starCount);
				setStarCount((prev) => prev * 2);
				setKeySequence([]);
			}
		}
		for (let i = 0; i < keySequence?.length; i++) {
			if (keySequence[i] !== secretKey[i]) {
				setKeySequence((prev) =>
					prev?.length === 1 ? [] : [prev[prev?.length - 1]]
				);
			}
		}
	}, [secretKey, keySequence]);

	return (
		<div ref={background}>
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
